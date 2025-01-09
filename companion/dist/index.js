import { SysTray } from "node-systray-v2";
import * as os from "os";
import * as fs from "fs";
import clipboard from "clipboardy";
import { ConfigManager } from "./config.js";
import { initServer } from "./server.js";
import { RichPresence } from "./rpc.js";
function toBase64(filePath) {
    const img = fs.readFileSync(filePath);
    return Buffer.from(img).toString("base64");
}
const copyTokenItem = {
    title: "Copy Token",
    tooltip: "Copy the token to clipboard",
    checked: false,
    enabled: true,
};
const regenerateTokenItem = {
    title: "Regenerate Token",
    tooltip: "Regenerate the token",
    checked: false,
    enabled: true,
};
const quitItem = {
    title: "Quit",
    tooltip: "Quit the application",
    checked: false,
    enabled: true,
};
ConfigManager.init();
initServer();
RichPresence.connect();
const systray = new SysTray({
    menu: {
        icon: os.platform() === "win32"
            ? toBase64("./assets/icon.ico")
            : toBase64("./assets/icon.png"),
        title: "",
        tooltip: "aniSearch Utils Companion",
        items: [copyTokenItem, regenerateTokenItem, quitItem],
    },
});
systray.onClick((action) => {
    switch (action.seq_id) {
        case 0:
            clipboard.writeSync(ConfigManager.config.token);
            break;
        case 1:
            // Regenerate Token
            break;
        case 2:
            // Quit
            systray.kill();
            process.exit(0);
    }
});
systray.on("ready", () => {
    console.log("Systray started");
});
