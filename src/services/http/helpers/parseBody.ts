export function parseBody(xhr: XMLHttpRequest): unknown {
  if (xhr.responseType !== "" && xhr.responseType !== "text") {
    return xhr.response;
  }

  const contentType = xhr.getResponseHeader("Content-Type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(xhr.responseText);
    } catch {
      return xhr.responseText;
    }
  }

  return xhr.responseText;
}
