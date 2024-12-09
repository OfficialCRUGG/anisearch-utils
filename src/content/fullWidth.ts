import css from ".fullWidth.css?raw";
import { init, injectCss } from "../lib/scriptUtils";

init("fullWidth", () => {
  injectCss(css);
});
