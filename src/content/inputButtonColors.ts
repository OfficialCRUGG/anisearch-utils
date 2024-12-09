import { $$, init } from "../lib/scriptUtils";

init("inputButtonColors", () => {
  const buttonColorMap = [
    ["input#synonyms_change", "tertiary"],
    ["input#synonyms_reset", "delete"],

    ["input#url_change", "tertiary"],
    ["input#url_reset", "delete"],

    ["input#ja_publisher_change", "tertiary"],
    ["input#ja_publisher_reset", "delete"],
    ["input#en_publisher_change", "tertiary"],
    ["input#en_publisher_reset", "delete"],
    ["input#de_publisher_change", "tertiary"],
    ["input#de_publisher_reset", "delete"],
    ["input#es_publisher_change", "tertiary"],
    ["input#es_publisher_reset", "delete"],
    ["input#fr_publisher_change", "tertiary"],
    ["input#fr_publisher_reset", "delete"],
    ["input#it_publisher_change", "tertiary"],
    ["input#it_publisher_reset", "delete"],

    ["input#episodes_change", "tertiary"],
    ["input#episodes_reset", "delete"],

    ["input#opening_change", "tertiary"],
    ["input#opening_reset", "delete"],
    ["input#ending_change", "tertiary"],
    ["input#ending_reset", "delete"],
    ["input#theme_change", "tertiary"],
    ["input#theme_reset", "delete"],
    ["input#insert_change", "tertiary"],
    ["input#insert_reset", "delete"],

    ["input#company_change", "tertiary"],
    ["input#company_reset", "delete"],

    ["input#seiyuu_change", "tertiary"],
    ["input#seiyuu_reset", "delete"],

    ["input#trailer_change", "tertiary"],
    ["input#trailer_reset", "delete"],
  ];

  buttonColorMap.forEach(([selector, color]) => {
    const buttons = $$(selector);
    if (!buttons || buttons.length === 0) return;
    buttons.forEach((button) => {
      button.classList.add(`asubutton-${color}`);
    });
  });
});
