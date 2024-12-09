console.log("background is running");

chrome.runtime.onInstalled.addListener(() => {});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "httpRequest") {
    const { url, method, headers, body } = message.details;
    fetch(url, {
      method: method || "GET",
      headers: headers || {},
      body: body || null,
    })
      .then((response) => response.text())
      .then((data) => {
        sendResponse({
          success: true,
          data,
        });
      })
      .catch((error) => {
        sendResponse({
          success: false,
          error,
        });
      });
    return true;
  }
});
