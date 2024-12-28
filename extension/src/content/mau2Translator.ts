import { log } from "../lib/logger";
import { $, $$, init } from "../lib/scriptUtils";
import { httpRequestHtml, httpRequestJson } from "../lib/corsUtils";
import { t } from "../lib/chromeI18n";

/*
  This code is an absolute mess.
  It's a port and slight improvement of a Tampermonkey script I wrote within a couple of hours.
  TODO: Improve. One day. When I feel insane enough to touch this again.
*/

const japaneseNumerals: { [key: string]: number } = {
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
  八: 8,
  九: 9,
  十: 10,
};

init("mau2Translator", () => {
  type QueueItem = {
    string: string;
    el: HTMLElement;
  };

  type QueueType = "romaji" | "translation";

  const romajiQueue: QueueItem[] = [];
  const translationQueue: QueueItem[] = [];

  const romajiDict = new Map();
  const translationDict = new Map();

  let romajiQueueInterval: any;
  let translationQueueInterval: any;

  function addToQueue(type: QueueType, string: string, el: HTMLElement) {
    const queue = type === "romaji" ? romajiQueue : translationQueue;
    const dict = type === "romaji" ? romajiDict : translationDict;
    if (dict.get(string)) {
      setValue(el, type, dict.get(string));
    } else {
      queue.push({ string, el });
    }
  }

  function createButton() {
    const button = document.createElement("button");
    button.textContent = "あ→a";
    button.style.marginLeft = "7px";
    button.style.border = "1px solid #ac8553;";
    button.style.backgroundColor = "#fcdfbb";
    button.style.borderRadius = "0";
    button.style.outline = "none";
    button.style.cursor = "pointer";
    return button;
  }

  function createTranslationButton(tableEl: HTMLElement) {
    const button = createButton();
    button.addEventListener("click", () => {
      const children = tableEl.querySelectorAll("tr:has(td.pgActor)");
      children.forEach((child) => {
        const part = child.querySelector(".pgPart") as HTMLElement;
        const actor = child.querySelector(".pgActor") as HTMLElement;
        if (!part || !actor) return;
        prepareElement(part);
        prepareElement(actor);
        addToQueue("romaji", part.firstChild?.textContent || "Invalid String", part);
        addToQueue("translation", part.firstChild?.textContent || "Invalid String", part);
        addToQueue("romaji", actor.firstChild?.textContent || "Invalid String", actor);
        addToQueue("translation", actor.firstChild?.textContent || "Invalid String", actor);
      });
      button.remove();
    });
    return button;
  }

  function injectButtons() {
    if (document.location.pathname.endsWith("/casts") || document.location.pathname.endsWith("/cast")) {
      // Is on /anime/:anime/cast(s)
      $$(".animeCast1.list").forEach((castList) => {
        const header = castList.querySelector('th[colspan="2"], th[colspan="3"]');
        if (!header) return;
        const button = createTranslationButton(castList);
        header.appendChild(button);
      });
    } else if (document.location.pathname.split("/").length === 3) {
      // Is on /anime/:anime
      $$(".animeCast.list").forEach((castList) => {
        const header = castList.querySelectorAll("th")[1];
        if (!header) return;
        const button = createTranslationButton(castList);
        header.appendChild(button);
      });
    }
  }

  function prepareElement(el: HTMLElement) {
    const existingRomajiEl = el.querySelector(".asu-mau2-romaji");
    if (!existingRomajiEl) {
      const romajiEl = document.createElement("p");
      romajiEl.textContent = "...";
      romajiEl.style.margin = "0";
      romajiEl.style.color = "#bd4fa6";
      romajiEl.className = "asu-mau2-romaji";
      el.appendChild(romajiEl);
    }

    const existingTranslatedEl = el.querySelector(".asu-mau2-translated");
    if (!existingTranslatedEl) {
      const translatedEl = document.createElement("p");
      translatedEl.textContent = "...";
      translatedEl.style.margin = "0";
      translatedEl.style.color = "#233596";
      translatedEl.className = "asu-mau2-translated";
      el.appendChild(translatedEl);
    }
  }

  function processRomajiQueue() {
    if (romajiQueue.length < 1) return;
    const { string, el } = romajiQueue.shift()!;
    if (romajiDict.get(string)) {
      setValue(el, "romaji", romajiDict.get(string));
    } else {
      httpRequestHtml({
        url: `https://www.romajidesu.com/translator/${string}`,
      })
        .then((response) => {
          const romaji = getRomajiFromResponse(response);
          romajiDict.set(string, romaji);
          saveDictToStorage("romaji");
          setValue(el, "romaji", romaji);
        })
        .catch((error) => {
          showError(error.message, "romaji");
        });
    }
  }

  function processTranslationQueue() {
    let buffer = [];
    while (translationQueue.length > 0 && buffer.length < 10) {
      const { string, el } = translationQueue.shift()!;
      if (translationDict.get(string)) {
        setValue(el, "translation", translationDict.get(string));
      } else {
        buffer.push({ string, el });
      }

      if (translationQueue.length === 0 || buffer.length >= 10) {
        const stringsToTranslate = buffer.map((item) => item.string).join("\n");

        const formData = new FormData();
        formData.append("q", stringsToTranslate);
        formData.append("sl", "ja");
        formData.append("tl", "en");

        httpRequestJson({
          method: "POST",
          url: `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
          // @ts-ignore
          body: new URLSearchParams(formData).toString(),
        })
          .then((response) => {
            const translatedStrings = response[0].map((s: any) => cleanString(s[0]));
            for (let i = 0; i < buffer.length; i++) {
              const { string, el } = buffer[i];
              const translated = translatedStrings[i];
              translationDict.set(string, translated);
              saveDictToStorage("translation");
              setValue(el, "translation", translated);
            }
          })
          .catch((error) => {
            showError(error.message, "translation");
          });
      }
    }
  }

  function cleanString(input: string): string {
    return input.trim().replace(/\s+/g, " ");
  }

  function getRomajiFromResponse(response: Document) {
    if (!response) return "???";
    const el = response.querySelector("#res_romaji") as HTMLElement;
    if (!el) return "???";
    const text = el.innerText;
    if (!text) return "???";
    return cleanString(text);
  }

  function setValue(el: HTMLElement, type: QueueType, value: string) {
    const childElement = el.querySelector(type === "romaji" ? ".asu-mau2-romaji" : ".asu-mau2-translated");
    if (!childElement) return;
    childElement.textContent = value;
  }

  function beginQueues() {
    romajiQueueInterval = setInterval(processRomajiQueue, 4000);
    translationQueueInterval = setInterval(processTranslationQueue, 6000);
  }

  function getErrorContainer() {
    const existingErrorContainer = $(".asu-mau2-error");
    if (existingErrorContainer) return existingErrorContainer;
    const errorContainer = document.createElement("div");
    errorContainer.style.position = "fixed";
    errorContainer.style.top = "10px";
    errorContainer.style.left = "10px";
    errorContainer.style.zIndex = "9999";
    errorContainer.style.display = "flex";
    errorContainer.style.flexDirection = "column";
    errorContainer.style.gap = "5px";
    document.body.appendChild(errorContainer);
    return errorContainer;
  }

  function showError(message: string, additionalContext?: string) {
    log("error", "Mau2 Translator Error: " + message);
    const errorContainer = getErrorContainer();
    const errorDiv = document.createElement("div");
    errorDiv.style.backgroundColor = "rgba(178, 32, 32, 0.5)";
    errorDiv.style.padding = "0px 15px";
    errorDiv.style.maxWidth = "600px";
    errorDiv.style.backdropFilter = "blur(20px)";

    const mainP = document.createElement("p");
    mainP.innerText =
      (additionalContext ? `${additionalContext}: ` : "") +
      chrome.i18n.getMessage("modules_mau2Translator_error_label") +
      message;

    errorDiv.appendChild(mainP);

    if (additionalContext) {
      const additionalP = document.createElement("p");
      if (additionalContext === "romaji") {
        clearInterval(romajiQueueInterval);
      } else if (additionalContext === "translation") {
        clearInterval(translationQueueInterval);
      }
      additionalP.innerText = chrome.i18n.getMessage("modules_mau2Translator_error_queueStopped");
      errorDiv.appendChild(additionalP);
    }

    errorContainer.appendChild(errorDiv);
  }

  function loadDictsFromStorage() {
    chrome.storage.local.get(["mau2RomajiDict", "mau2TranslationDict"], (result) => {
      if (result.mau2RomajiDict) {
        Object.entries(result.mau2RomajiDict).forEach(([key, value]) => {
          romajiDict.set(key, value);
        });
      }
      if (result.mau2TranslationDict) {
        Object.entries(result.mau2TranslationDict).forEach(([key, value]) => {
          translationDict.set(key, value);
        });
      }
    });
  }

  function saveDictToStorage(dict: QueueType) {
    const dictToSave = dict === "romaji" ? romajiDict : translationDict;
    const key = dict === "romaji" ? "mau2RomajiDict" : "mau2TranslationDict";
    chrome.storage.local.set({ [key]: Object.fromEntries(dictToSave) });
  }

  function injectFullListButton() {
    if (!(document.location.pathname.endsWith("/casts") || document.location.pathname.endsWith("/cast"))) return;

    console.log(1);

    const button = createButton();
    button.textContent = t("modules.mau2Translator.fullList.button");
    button.style.marginTop = "10px";
    button.addEventListener("click", () => {
      // Collect data
      const voiceActors: { part: string; actor: string; episodes: string[] }[] = [];
      const episodeLists = $$(".animeCast1.list");
      episodeLists.forEach((list) => {
        const heading = list.querySelector("th[colspan='2'], th[colspan='3']")?.textContent;
        let episode = heading?.match(/\d+/)?.[0];
        if (!episode) {
          const jpEpisode = heading?.match(/[一二三四五六七八九十]+/)?.[0];
          if (!jpEpisode) return;
          episode = String([...jpEpisode].reduce((acc, cur) => acc + japaneseNumerals[cur], 0));
        }
        const actors = list.querySelectorAll("tr:has(td.pgActor)");
        actors.forEach((item) => {
          const part = item.querySelector(".pgPart")?.textContent;
          const actor = item.querySelector(".pgActor")?.textContent;
          if (!part || !actor) return;
          const existingEntry = voiceActors.find((entry) => entry.part === part && entry.actor === actor);
          if (existingEntry) {
            existingEntry.episodes.push(episode || "0");
          } else {
            voiceActors.push({
              episodes: [episode || "0"],
              part,
              actor,
            });
          }
        });
      });

      // Merge episodes in a row
      voiceActors.forEach((actor) => {
        let previousEpisode = 0;
        const episodes = actor.episodes.map(Number);
        const episodeBundles: number[][] = [];
        episodes.forEach((episode) => {
          // If the previous episode is 0, create a new bundle
          if (previousEpisode === 0) {
            episodeBundles.push([episode]);
          } else {
            // Check if the current episode is directly after the previous one
            if (episode === previousEpisode + 1) {
              // Add episode to last bundle
              episodeBundles[episodeBundles.length - 1].push(episode);
            } else {
              // Create a new bundle
              episodeBundles.push([episode]);
            }
          }
          previousEpisode = episode;
        });

        // Convert bundles to strings
        actor.episodes = episodeBundles.map((bundle) => {
          if (bundle.length < 3) return bundle.join(",");
          return `${bundle[0]}-${bundle[bundle.length - 1]}`;
        });
      });

      // Construct Table
      const table = document.createElement("table");
      table.className = "animeCast1 list exdingbats";
      table.style.width = "100%";

      const tbody = document.createElement("tbody");
      table.appendChild(tbody);

      const headingTr = document.createElement("tr");
      tbody.appendChild(headingTr);

      const headingTh = document.createElement("th");
      headingTh.colSpan = 3;
      headingTh.textContent = "Full List";
      headingTr.appendChild(headingTh);

      voiceActors.forEach((actor, index) => {
        const isEven = index % 2 === 0;

        const tr = document.createElement("tr");
        if (isEven) tr.classList.add("even");
        tbody.appendChild(tr);

        const partTd = document.createElement("td");
        partTd.className = "pgPart";
        partTd.textContent = actor.part;
        tr.appendChild(partTd);

        const actorTd = document.createElement("td");
        actorTd.className = "pgActor";
        actorTd.textContent = actor.actor;
        tr.appendChild(actorTd);

        const episodesTd = document.createElement("td");
        episodesTd.className = "pgEpisodes";
        episodesTd.textContent = actor.episodes.join(",");
        tr.appendChild(episodesTd);
      });

      const referenceEl = $("#animeCastM .lineUp");
      referenceEl?.parentElement?.insertBefore(table, referenceEl);

      // Inject Translation Button
      const button = createTranslationButton(table);
      headingTh.appendChild(button);

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const hintSpan = document.createElement("span");
    hintSpan.style.fontSize = "14px";
    hintSpan.style.color = "#777";
    hintSpan.style.display = "block";
    const messages = [
      t("modules.mau2Translator.fullList.hint1"),
      t("modules.mau2Translator.fullList.hint2"),
      t("modules.mau2Translator.fullList.hint3"),
    ];
    messages.forEach((message, index) => {
      const textNode = document.createTextNode(message);
      hintSpan.appendChild(textNode);

      if (index < messages.length - 1) {
        const br = document.createElement("br");
        hintSpan.appendChild(br);
      }
    });

    const referenceEl = $("#animeBoxMain hr") ?? $("#footer hr");
    console.log(referenceEl);
    referenceEl?.parentElement?.insertBefore(button, referenceEl);
    referenceEl?.parentElement?.insertBefore(hintSpan, referenceEl);
  }

  injectButtons();
  beginQueues();
  loadDictsFromStorage();
  injectFullListButton();
});
