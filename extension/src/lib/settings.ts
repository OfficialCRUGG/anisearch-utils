import { createLinkVariants } from "./scriptUtils";

type BaseSetting = {
  group: string;
  id: string;
  module: boolean;
  matches?: string[];
};

type BooleanSetting = BaseSetting & {
  type: "boolean";
  default: boolean;
};

export type Setting = BooleanSetting;

export const settings: Setting[] = [
  {
    group: "animePage",
    id: "linkMau2",
    type: "boolean",
    default: false,
    module: true,
    matches: createLinkVariants("/anime/*"),
  },
  {
    group: "input",
    id: "inputButtonColors",
    type: "boolean",
    default: false,
    module: true,
    matches: createLinkVariants("/usercp/input/**"),
  },
  {
    group: "input",
    id: "keyboardShortcuts",
    type: "boolean",
    default: false,
    module: true,
    matches: createLinkVariants("/usercp/input/**"),
  },
  {
    group: "extrasExternal",
    id: "mau2Translator",
    type: "boolean",
    default: false,
    module: true,
    matches: [
      "https://www.mau2.com/anime/*/cast",
      "https://www.mau2.com/anime/*/casts",
      "https://www.mau2.com/anime/*",
    ],
  },
];

export function getGroups() {
  const groups: { id: string; settings: Setting[] }[] = [];

  settings.forEach((setting) => {
    let group = groups.find((group) => group.id === setting.group);
    if (!group) {
      group = { id: setting.group, settings: [] };
      groups.push(group);
    }
    group.settings.push(setting);
  });

  return groups;
}

export function getKeys() {
  return settings.map((setting) => setting.id);
}

export function getSetting(id: string) {
  return settings.find((setting) => setting.id === id);
}

export function constructContentScriptPath(setting: Setting, runtime = false) {
  return runtime ? `src/content/${setting.id}.ts-loader.js` : `src/content/${setting.id}.ts`;
}

export function getContentScriptPaths(runtime = false) {
  return settings.filter((setting) => setting.module).map((id) => constructContentScriptPath(id, runtime));
}

export function constructContentScriptEntry(setting: Setting) {
  return {
    matches: setting.matches,
    js: [constructContentScriptPath(setting)],
    run_at: "document_end",
  };
}

export function getContentScriptEntries() {
  return settings.filter((setting) => setting.module).map(constructContentScriptEntry);
}
