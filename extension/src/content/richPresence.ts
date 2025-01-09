import { init } from "../lib/scriptUtils";

init("richPresence", () => {
  let activity: any = null;

  /*
  setInterval(() => {
    if (activity) {
      chrome.runtime.sendMessage({
        action: "setActivity",
        details: activity,
      });
    }
  }, 10000);
  */

  function setActivity(activity: any) {
    activity = activity;
    chrome.runtime.sendMessage({
      action: "setActivity",
      details: activity,
    });
  }

  /*
  setInterval(() => {
    if (document.hidden) {
      setActivity({
        state: "B",
      });
    } else {
      setActivity({
        state: "A",
      });
    }
  }, 5000);
  */
});
