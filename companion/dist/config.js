import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as crypto from "crypto";
import * as YAML from "yaml";
function getAppConfigDir() {
    const appName = "aniSearch Utils Companion";
    const homeDir = os.homedir();
    if (process.platform === "win32") {
        // On Windows, use %APPDATA%
        return path.join(process.env.APPDATA || path.join(homeDir, "AppData", "Roaming"), appName);
    }
    else if (process.platform === "darwin") {
        // On macOS, use ~/Library/Application Support
        return path.join(homeDir, "Library", "Application Support", appName);
    }
    else {
        // On Linux/Unix, use $XDG_CONFIG_HOME or fallback to ~/.config
        const configHome = process.env.XDG_CONFIG_HOME || path.join(homeDir, ".config");
        return path.join(configHome, appName);
    }
}
const DEFAULT_CONFIG = {
    token: crypto.randomBytes(32).toString("hex"),
};
export class ConfigManager {
    static config = {};
    static init() {
        if (!fs.existsSync(getAppConfigDir())) {
            fs.mkdirSync(getAppConfigDir(), { recursive: true });
        }
        if (!fs.existsSync(path.join(getAppConfigDir(), "config.yaml"))) {
            this.config = DEFAULT_CONFIG;
            this.save();
        }
        else {
            const configFile = fs.readFileSync(path.join(getAppConfigDir(), "config.yaml"), "utf8");
            const configData = YAML.parse(configFile);
            this.config = { ...DEFAULT_CONFIG, ...configData };
        }
    }
    static save() {
        fs.writeFileSync(path.join(getAppConfigDir(), "config.yaml"), YAML.stringify(this.config));
    }
}
