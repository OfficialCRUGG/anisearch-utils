import { log } from "./logger";

export function init(id: string, func: () => void): void {
  chrome.storage.sync.get(id, (result) => {
    if (result[id] === true) {
      log("loader", `Loading module ${id}`);
      func();
    }
  });
}

export function $(selector: string): HTMLElement | null {
  return document.querySelector(selector);
}

export function $$(selector: string): NodeListOf<HTMLElement> {
  return document.querySelectorAll(selector);
}

export function createLinkVariants(link: string) {
  const sites = ["anisearch.com", "anisearch.de", "anisearch.es", "anisearch.fr", "anisearch.it", "anisearch.jp"];

  if (link.startsWith("/")) link = `https://www.anisearch.com${link}`;

  // If the link doesn't contain any of the sites, return an array with just the original link
  if (!sites.some((site) => link.includes(site))) {
    return [link];
  }

  const variants = sites.map((site) => link.replace("anisearch.com", site));
  return variants;
}

type AsuButtonOptions = {
  element: "a" | "button";
  className?: string;
  variant?: "primary" | "secondary";
  text: string;
  tooltip?: string;
  href?: string;
  onClick?: (event: MouseEvent) => void;
};

export function buildAsuButton(options: AsuButtonOptions): HTMLAnchorElement | HTMLButtonElement {
  const button = document.createElement(options.element);
  const variantClasses = {
    primary: "",
    secondary: "asubutton-secondary",
  };
  button.className = `asubutton ${variantClasses[options.variant || "primary"]} ${options.className || ""}`;
  button.textContent = options.text;
  if (options.tooltip) button.title = options.tooltip;
  if (options.href) (button as HTMLAnchorElement).href = options.href;
  // @ts-ignore
  if (options.onClick) button.addEventListener("click", options.onClick);
  return button;
}

export function injectCss(css: string): void {
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
}
