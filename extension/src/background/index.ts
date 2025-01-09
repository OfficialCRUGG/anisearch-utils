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

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if ((message.action = "setActivity")) {
    const activity = message.details;
    const res = await fetch("http://localhost:8381/rpc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "391263f58ebf4164dffe51ec5e868da6b5607c67f05180b2650dd05928efa627",
      },
      body: JSON.stringify(activity),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
      });
    console.log(res);
  }
});
