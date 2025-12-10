import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";
import { puckHandler } from "@puckeditor/cloud-client";

/**
 * Converts a PagesHttpRequest to a standard web Request object
 * for compatibility with puckHandler.
 */
function toWebRequest(pagesRequest: PagesHttpRequest): Request {
  const { method, headers, body, queryParams } = pagesRequest;

  // Build URL with query parameters
  const url = new URL("http://localhost/api/puck/chat");
  for (const [key, value] of Object.entries(queryParams)) {
    url.searchParams.set(key, value);
  }

  // Convert headers - PagesHttpRequest headers can be string[] or string
  const webHeaders = new Headers();
  for (const [key, value] of Object.entries(headers)) {
    if (Array.isArray(value)) {
      value.forEach((v) => webHeaders.append(key, v));
    } else {
      webHeaders.set(key, value as string);
    }
  }

  return new Request(url.toString(), {
    method,
    headers: webHeaders,
    body: method !== "GET" && method !== "HEAD" ? body : undefined,
  });
}

export default async function chat(
  request: PagesHttpRequest
): Promise<PagesHttpResponse> {
  console.log(request);
  const webRequest = toWebRequest(request);
  console.log(webRequest);

  const response = await puckHandler(webRequest, {
    ai: {
      context:
        "You are a helpful assistant that can answer questions and help with tasks.",
    },
    apiKey: "PdoQlHIWCAQXcBmRzUTZdFUDWzbpyqyYzlvEJXiTqkyaKhpCZGxtBpFPgdRlyFTb",
  });

  // Convert Response back to PagesHttpResponse
  const responseBody = await response.text();
  const responseHeaders: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    responseHeaders[key] = value;
  });

  return {
    body: responseBody,
    headers: responseHeaders,
    statusCode: response.status,
  };
}
