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
