import * as fs from "node:fs";

const locales = fs.readdirSync("./i18n");
locales.forEach(async (locale) => {
  const messagesFile = {};
  const files = await fs.readdirSync(`./i18n/${locale}`, { recursive: true });
  files.forEach((file) => {
    if (!file.endsWith(".json")) return;
    const content = JSON.parse(fs.readFileSync(`./i18n/${locale}/${file}`, "utf-8"));
    const stringPathBase = file.replace(".json", "").split("/");
    Object.entries(content).forEach(([key, value]) => {
      const stringPath = [...stringPathBase, ...key.split(".")];
      messagesFile[stringPath.join("_")] = {
        message: value,
      };
    });
  });
  await fs.mkdirSync(`./_locales/${locale}`, { recursive: true });
  await fs.writeFileSync(`./_locales/${locale}/messages.json`, JSON.stringify(messagesFile, null, 2), {
    encoding: "utf-8",
  });
});
