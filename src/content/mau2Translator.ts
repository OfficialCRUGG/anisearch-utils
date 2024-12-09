import { log } from "../lib/logger";
import { $$, init } from "../lib/scriptUtils";
import { httpRequestHtml, httpRequestJson } from "../lib/corsUtils";

/*
  This code is an absolute mess.
  It's a port and slight improvement of a Tampermonkey script I wrote within a couple of hours.
  TODO: Improve. One day. When I feel insane enough to touch this again.
*/

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
    button.innerHTML = "あ→a";
    button.style.marginLeft = "7px";
    button.style.border = "1px solid #ac8553;";
    button.style.backgroundColor = "#fcdfbb";
    button.style.borderRadius = "0";
    button.style.outline = "none";
    button.style.cursor = "pointer";
    return button;
  }

  function injectButtons() {
    if (document.location.pathname.endsWith("/casts")) {
      // Is on /anime/:anime/casts
      $$(".animeCast1.list").forEach((castList) => {
        const header = castList.querySelector('th[colspan="2"]');
        if (!header) return;
        const button = createButton();
        button.addEventListener("click", () => {
          const children = castList.querySelectorAll("tr:has(td.pgActor)");
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
        header.appendChild(button);
      });
    } else if (document.location.pathname.split("/").length === 3) {
      // Is on /anime/:anime
      console.log("UWO");
      $$(".animeCast.list").forEach((castList) => {
        const header = castList.querySelectorAll("th")[1];
        if (!header) return;
        const button = createButton();
        button.addEventListener("click", () => {
          const children = castList.querySelectorAll("tr:has(td.pgActor)");
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
    childElement.innerHTML = value;
  }

  function beginQueues() {
    romajiQueueInterval = setInterval(processRomajiQueue, 4000);
    translationQueueInterval = setInterval(processTranslationQueue, 6000);
  }

  function getErrorContainer() {
    const existingErrorContainer = document.querySelector(".asu-mau2-error");
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

  injectButtons();
  beginQueues();
  loadDictsFromStorage();
});
