type HttpRequestDetails = {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  body?: Blob | BufferSource | FormData | URLSearchParams | string;
};

export function httpRequest(details: HttpRequestDetails): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: "httpRequest", details }, (response) => {
      if (response && response.success) {
        resolve(response.data); // Return the raw response as text
      } else {
        reject(response?.error || "Unknown error occurred");
      }
    });
  });
}

export function httpRequestJson(details: HttpRequestDetails): Promise<any> {
  return httpRequest(details).then((responseText) => {
    try {
      return JSON.parse(responseText); // Parse the text as JSON
    } catch (error: any) {
      throw new Error("Failed to parse JSON: " + error.message);
    }
  });
}

export function httpRequestHtml(details: HttpRequestDetails): Promise<Document> {
  return httpRequest(details).then((responseText) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(responseText, "text/html"); // Parse the text as HTML
    return doc;
  });
}
