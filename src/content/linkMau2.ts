import { registerAdditionalButton } from "../lib/pageSpecific/animePageUtils";
import { $, buildAsuButton, init } from "../lib/scriptUtils";

init("linkMau2", () => {
  const japaneseTitle = $("[role='doc-subtitle'] span.subheader[lang='ja']")?.textContent;
  if (!japaneseTitle) return;
  const button = buildAsuButton({
    element: "a",
    variant: "secondary",
    text: chrome.i18n.getMessage("modules_linkMau2_button_text"),
    tooltip: chrome.i18n.getMessage("modules_linkMau2_button_tooltip"),
    href: `https://www.mau2.com/search?q=${encodeURIComponent(japaneseTitle)}&c=c&t=voice&show`,
  });
  registerAdditionalButton(button);
});
