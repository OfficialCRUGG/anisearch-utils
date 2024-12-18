import { t } from "../lib/chromeI18n";
import { log } from "../lib/logger";
import { $, $$, buildAsuButton, init, injectCss } from "../lib/scriptUtils";
import { KeyboardArea } from "../lib/types";
import globalCss from "./keyboardShortcuts.css?raw";

init("keyboardShortcuts", () => {
  injectCss(globalCss);

  function focusInput(selector: string) {
    $(selector)?.focus();
  }

  function seiyuuInject(selector: string, index: number) {
    return (el: HTMLElement) => {
      const target = $$(`#seiyuulists ${selector}`)[index];
      if (!target) return;
      target.querySelector("li")?.prepend(el);
    };
  }

  function episodeInject(index: number) {
    return (el: HTMLElement) => {
      const target = $$("#episodes #episodeslistbox .inputBox-Header ul.table")[index];
      if (!target) return;
      target.querySelector("li")?.prepend(el);
    };
  }

  function buttonInject(selector: string, area: string) {
    return (el: HTMLElement) => {
      const target = $(selector) as HTMLInputElement;
      if (!target) return;
      const cleanValue = target.value.replace(/\[.*\] /, "");
      const key = el.textContent;
      target.value = activeArea === area ? `[${key}] ${cleanValue}` : cleanValue;
      onActiveAreaChange(() => {
        const cleanValue = target.value.replace(/\[.*\] /, "");
        target.value = activeArea === area ? `[${key}] ${cleanValue}` : cleanValue;
      });
    };
  }

  const areas: KeyboardArea[] = [
    {
      id: "voiceActors",
      inject: (el: HTMLElement) => {
        const seiyuuLists = $("#seiyuulists");
        if (!seiyuuLists) return;
        seiyuuLists.parentElement?.insertBefore(el, seiyuuLists);
      },
      actions: [
        {
          name: "characterType",
          defaultKey: "1",
          action: () => focusInput("#seiyuu_type"),
          inject: seiyuuInject(".table", 0),
        },
        {
          name: "character",
          defaultKey: "2",
          action: () => focusInput("#search_anime_character"),
          inject: seiyuuInject(".table", 1),
        },
        {
          name: "japaneseVa",
          defaultKey: "3",
          action: () => focusInput("#search_person1"),
          inject: seiyuuInject(".seiyuu_ja_input", 0),
        },
        {
          name: "japaneseRole",
          defaultKey: "4",
          action: () => focusInput("#seiyuu_role1"),
          inject: seiyuuInject(".seiyuu_ja_input", 1),
        },
        {
          name: "englishVa",
          defaultKey: "5",
          action: () => focusInput("#search_person2"),
          inject: seiyuuInject(".seiyuu_en_input", 0),
        },
        {
          name: "englishRole",
          defaultKey: "6",
          action: () => focusInput("#seiyuu_role2"),
          inject: seiyuuInject(".seiyuu_en_input", 1),
        },
        {
          name: "germanVa",
          defaultKey: "7",
          action: () => focusInput("#search_person3"),
          inject: seiyuuInject(".seiyuu_de_input", 0),
        },
        {
          name: "germanRole",
          defaultKey: "8",
          action: () => focusInput("#seiyuu_role3"),
          inject: seiyuuInject(".seiyuu_de_input", 1),
        },
        {
          name: "spanishVa",
          defaultKey: "9",
          action: () => focusInput("#search_person4"),
          inject: seiyuuInject(".seiyuu_es_input", 0),
        },
        {
          name: "spanishRole",
          defaultKey: "0",
          action: () => focusInput("#seiyuu_role4"),
          inject: seiyuuInject(".seiyuu_es_input", 1),
        },
        {
          name: "frenchVa",
          defaultKey: "q",
          action: () => focusInput("#search_person5"),
          inject: seiyuuInject(".seiyuu_fr_input", 0),
        },
        {
          name: "frenchRole",
          defaultKey: "w",
          action: () => focusInput("#seiyuu_role5"),
          inject: seiyuuInject(".seiyuu_fr_input", 1),
        },
        {
          name: "italianVa",
          defaultKey: "e",
          action: () => focusInput("#search_person6"),
          inject: seiyuuInject(".seiyuu_it_input", 0),
        },
        {
          name: "italianRole",
          defaultKey: "r",
          action: () => focusInput("#seiyuu_role6"),
          inject: seiyuuInject(".seiyuu_it_input", 1),
        },
        {
          name: "modNote",
          defaultKey: "a",
          action: () => focusInput("#seiyuu_hint"),
          inject: seiyuuInject(".table", 16),
        },
        {
          name: "action",
          defaultKey: "s",
          action: () => $("#seiyuu_pos")?.focus(),
          inject: seiyuuInject(".table", 17),
        },
        {
          name: "add",
          defaultKey: "y",
          action: () => $("#seiyuu_add")?.click(),
          inject: buttonInject("#seiyuu_add", "voiceActors"),
        },
        {
          name: "change",
          defaultKey: "x",
          action: () => $("#seiyuu_change")?.click(),
          inject: buttonInject("#seiyuu_change", "voiceActors"),
        },
        {
          name: "reset",
          defaultKey: "c",
          action: () => $("#seiyuu_reset")?.click(),
          inject: buttonInject("#seiyuu_reset", "voiceActors"),
        },
      ],
    },
    {
      id: "episodes",
      inject: (el: HTMLElement) => {
        const episodes = $("#episodeslistbox .inputBox-Header");
        if (!episodes) return;
        episodes.parentElement?.insertBefore(el, episodes);
      },
      actions: [
        {
          name: "episode",
          defaultKey: "q",
          action: () => focusInput("#episodes_number"),
          inject: episodeInject(0),
        },
        {
          name: "title",
          defaultKey: "w",
          action: () => focusInput("#episodes_title"),
          inject: episodeInject(1),
        },
        {
          name: "original",
          defaultKey: "e",
          action: () => {
            const checkbox = $("#episodes_original");
            if (checkbox) checkbox.click();
          },
          inject: episodeInject(2),
        },
        {
          name: "runtime",
          defaultKey: "r",
          action: () => focusInput("#episodes_runtime"),
          inject: episodeInject(3),
        },
        {
          name: "airdate",
          defaultKey: "a",
          action: () => focusInput("#episodes_aired"),
          inject: episodeInject(4),
        },
        {
          name: "tags_filler",
          defaultKey: "1",
          action: () => {
            const filler = $("#episodes_filler");
            if (filler) filler.click();
          },
          inject: (el: HTMLElement) => {
            const checkboxLabel = $("#episodes_filler")?.parentElement;
            if (checkboxLabel) checkboxLabel.parentElement?.insertBefore(el, checkboxLabel);
          },
        },
        {
          name: "tags_recap",
          defaultKey: "2",
          action: () => {
            const recap = $("#episodes_recap");
            if (recap) recap.click();
          },
          inject: (el: HTMLElement) => {
            const checkboxLabel = $("#episodes_recap")?.parentElement;
            if (checkboxLabel) checkboxLabel.parentElement?.insertBefore(el, checkboxLabel);
          },
        },
        {
          name: "bonus",
          defaultKey: "s",
          action: () => focusInput("#search_bonusanime"),
          inject: episodeInject(6),
        },
        {
          name: "action",
          defaultKey: "d",
          action: () => $("#episodes_pos")?.focus(),
          inject: episodeInject(7),
        },
        {
          name: "add",
          defaultKey: "y",
          action: () => $("#episodes_add")?.click(),
          inject: buttonInject("#episodes_add", "episodes"),
        },
        {
          name: "change",
          defaultKey: "x",
          action: () => $("#episodes_change")?.click(),
          inject: buttonInject("#episodes_change", "episodes"),
        },
        {
          name: "reset",
          defaultKey: "c",
          action: () => $("#episodes_reset")?.click(),
          inject: buttonInject("#episodes_reset", "episodes"),
        },
        {
          name: "shortcuts",
          defaultKey: "f",
          action: () => focusInput("#episodes_shortcuts"),
          inject: episodeInject(8),
        },
        {
          name: "shortcuts_apply",
          defaultKey: "v",
          action: () => $("#episodes_shortcut_apply")?.click(),
          inject: buttonInject("#episodes_shortcut_apply", "episodes"),
        },
        {
          name: "shortcuts_reset",
          defaultKey: "b",
          action: () => $("#episodes_shortcut_reset")?.click(),
          inject: buttonInject("#episodes_shortcut_reset", "episodes"),
        },
      ],
    },
  ];

  const keyMaps: Record<string, Map<string, string>> = {};
  let activeArea: string | null = null;

  // Assemble keyMaps
  areas.forEach((area) => {
    const keyMap = new Map<string, string>();
    area.actions.forEach((action) => {
      keyMap.set(action.defaultKey, action.name);
    });
    keyMaps[area.id] = keyMap;
  });

  // Active area change events
  let activeAreaChangeEvents: (() => void)[] = [];
  function onActiveAreaChange(callback: () => void) {
    activeAreaChangeEvents.push(callback);
  }

  // Inject the activation buttons
  function setActiveArea(id: string) {
    activeArea = activeArea === id ? null : id;
    $$("[data-area]").forEach((el) => {
      const area = el.getAttribute("data-area");
      if (area === activeArea) {
        el.textContent = t("modules.keyboardShortcuts.deactivate");
      } else {
        el.textContent = t("modules.keyboardShortcuts.activate");
      }
    });
    $$("[data-ki-area]").forEach((el) => {
      const area = el.getAttribute("data-ki-area");
      if (area === activeArea) {
        el.style.display = "inline-flex";
      } else {
        el.style.display = "none";
      }
    });
    activeAreaChangeEvents.forEach((event) => event());
  }

  areas.forEach((area) => {
    const button = buildAsuButton({
      element: "button",
      className: "asubutton-secondary",
      text: t("modules.keyboardShortcuts.activate"),
      onClick: () => {
        setActiveArea(area.id);
      },
    });
    button.setAttribute("data-area", area.id);
    area.inject(button);
  });

  // Inject keyboard shortcut indicators
  areas.forEach((area) => {
    area.actions.forEach((action) => {
      const keyboardIndicator = document.createElement("div");
      keyboardIndicator.className = "asu-keyboard-indicator";
      keyboardIndicator.textContent = keyMaps[area.id].entries().find((entry) => entry[1] === action.name)?.[0] || "";
      keyboardIndicator.setAttribute("data-ki-area", area.id);
      keyboardIndicator.style.display = "none";
      action.inject(keyboardIndicator);
    });
  });

  // Handle keyboard events
  window.addEventListener("keydown", (event) => {
    // Return if user is typing in an input field or similar
    const target = event.target as HTMLElement;
    const isInteractiveElement =
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT" ||
      target.isContentEditable;

    if (isInteractiveElement) return;

    // Main handling
    if (!activeArea) return;
    const keyMap = keyMaps[activeArea];
    if (!keyMap) return;
    const actionName = keyMap.get(event.key);
    if (!actionName) return;
    const area = areas.find((area) => area.id === activeArea);
    if (!area) return;
    const action = area.actions.find((action) => action.name === actionName);
    log("keyboard", `Triggering action: ${actionName}`);
    action?.action();
    event.preventDefault();
  });

  // Make inputs unfocusable with ESC
  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const target = event.target as HTMLElement;
    if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT") {
      target.blur();
    }
  });
});
