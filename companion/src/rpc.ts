import RPC from "discord-rich-presence";

export class RichPresence {
  public static client: any;
  public static disconnectTimeout: NodeJS.Timeout | null = null;
  public static reconnectInterval: NodeJS.Timeout | null = null;

  public static connect() {
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

  public static disconnect() {
    RichPresence.client.disconnect();
    RichPresence.client = null;
  }

  public static isConnected() {
    return RichPresence.client !== null;
  }

  public static updatePresence(presence: any) {
    if (!RichPresence.isConnected()) return;
    RichPresence.client.updatePresence(presence);
    RichPresence.setDisconnectTimeout();
  }

  public static setDisconnectTimeout() {
    clearTimeout(RichPresence.disconnectTimeout);
    RichPresence.disconnectTimeout = setTimeout(() => {
      RichPresence.disconnect();
      clearTimeout(RichPresence.disconnectTimeout);
    }, 20 * 1000);
  }
}
