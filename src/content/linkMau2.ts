import { $, init } from "../lib/scriptUtils";

init("linkMau2", () => {
  const japaneseTitle = $("[role='doc-subtitle'] span.subheader[lang='ja']");
  console.log("HALLO FROM MODULE! :D");
});
