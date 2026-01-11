import { type AxiosInstance } from "axios";
import { DEFAULT_INCLUDE_LANGUAGE_PARAM } from "#shared/utils/api/constants";

const setHeaders = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(async (config) => {
    config.headers = config.headers ?? {};
    config.headers["Content-Type"] = "application/json;charset=utf-8";

    if (config.method === "GET") {
      config.headers["language"] =
        config.headers["language"] ?? DEFAULT_INCLUDE_LANGUAGE_PARAM;
    }
    return config;
  });
};

export const setUpClientSideApiRequestInterceptors = (
  axiosInstance: AxiosInstance,
) => {
  // request
  setHeaders(axiosInstance);

  // response

  return axiosInstance;
};
