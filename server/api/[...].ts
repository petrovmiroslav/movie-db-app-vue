import { CLIENT_SIDE_BASE_URL } from "#shared/utils/api/constants";
import { appAxiosInstance } from "#shared/utils/api/api";

export default defineEventHandler(async (event) => {
  try {
    const method = event.node.req.method || "GET";
    const url = event.path.replace(new RegExp(`^${CLIENT_SIDE_BASE_URL}`), "");

    let body = undefined;
    if (method !== "GET" && method !== "HEAD") {
      body = await readBody(event);
    }

    const response = await appAxiosInstance.request({
      url,
      method,
      data: body,
    });

    return response.data;
  } catch (error) {
    setResponseStatus(event, 500);
    setResponseHeader(event, "Content-Type", "text/plain");
    return "Something went wrong.";
  }
});
