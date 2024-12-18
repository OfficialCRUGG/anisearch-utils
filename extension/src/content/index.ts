import { log } from "../lib/logger";
import commonStyles from "../lib/globalStyles/common.css?raw";
import { injectCss } from "../lib/scriptUtils";

log("loader", "Loading common script");

injectGlobalStyles();

function injectGlobalStyles() {
  injectCss(commonStyles);
  log("styles", "Injecting global styles");
}
