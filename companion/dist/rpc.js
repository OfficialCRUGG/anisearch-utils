import RPC from "discord-rich-presence";
export class RichPresence {
    static client;
    static disconnectTimeout = null;
    static reconnectInterval = null;
    static connect() {
        clearInterval(RichPresence.reconnectInterval);
        RichPresence.client = RPC("1322963810159558727");
        this.client.on("connected", () => {
            console.log("Connected to Discord");
        });
        this.client.on("error", () => {
            console.log("Disconnected from Discord");
            RichPresence.reconnectInterval = setInterval(() => {
                RichPresence.connect();
            }, 20000);
        });
    }
    static disconnect() {
        RichPresence.client.disconnect();
        RichPresence.client = null;
    }
    static isConnected() {
        return RichPresence.client !== null;
    }
    static updatePresence(presence) {
        if (!RichPresence.isConnected())
            return;
        RichPresence.client.updatePresence(presence);
        RichPresence.setDisconnectTimeout();
    }
    static setDisconnectTimeout() {
        clearTimeout(RichPresence.disconnectTimeout);
        RichPresence.disconnectTimeout = setTimeout(() => {
            RichPresence.disconnect();
            clearTimeout(RichPresence.disconnectTimeout);
        }, 20 * 1000);
    }
}
