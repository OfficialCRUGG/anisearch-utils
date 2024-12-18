import { defineManifest } from "@crxjs/vite-plugin";
import packageData from "../package.json";
import { getContentScriptEntries } from "./lib/settings";
import { createLinkVariants } from "./lib/scriptUtils";

//@ts-ignore
const isDev = process.env.NODE_ENV == "development";

const firefox = process.env.BROWSER === "firefox";

const manifest = defineManifest({
  name: `__MSG_meta_name__${isDev ? ` Development Build` : ""}`,
  description: "__MSG_meta_description__",
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: "img/logo-16.png",
    32: "img/logo-34.png",
    48: "img/logo-48.png",
    128: "img/logo-128.png",
  },
  action: {
    default_popup: "popup.html",
    default_icon: "img/logo-48.png",
  },
  options_page: "options.html",
  background: firefox
    ? {
        scripts: ["src/background/index.ts"],
      }
    : {
        service_worker: "src/background/index.ts",
        type: "module",
      },
  content_scripts: [
    {
      matches: createLinkVariants("https://www.anisearch.com/**"),
      js: ["src/content/index.ts"],
    },
    ...getContentScriptEntries(),
  ],
  side_panel: {
    default_path: "sidepanel.html",
  },
  web_accessible_resources: [
    {
      resources: ["img/logo-16.png", "img/logo-34.png", "img/logo-48.png", "img/logo-128.png"],
      matches: [],
    },
  ],
  host_permissions: [
    ...createLinkVariants("https://www.anisearch.com/*"),
    "https://www.romajidesu.com/*",
    "https://translate.googleapis.com/*",
    "https://www.mau2.com/*",
  ],
  default_locale: "en",
  permissions: ["sidePanel", "storage", "activeTab", "scripting", "unlimitedStorage"],
});

if (firefox) {
  // @ts-ignore
  manifest.browser_specific_settings = {
    gecko: {
      id: "asutils@crg.sh",
      strict_min_version: "109.0",
    },
  };
}

export default manifest;
