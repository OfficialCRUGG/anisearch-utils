export function t(key: string) {
  if (!chrome?.i18n?.getMessage) return `[${key}]`;
  return chrome.i18n.getMessage(key.replaceAll(".", "_"));
}
