import { log } from "../lib/logger";
import commonStyles from "../lib/globalStyles/common.css?raw";

log("loader", "Loading common script");

injectGlobalStyles();

function injectGlobalStyles() {
  const style = document.createElement("style");
  style.innerHTML = commonStyles;
  document.head.appendChild(style);
  log("styles", "Injecting global styles");
}
