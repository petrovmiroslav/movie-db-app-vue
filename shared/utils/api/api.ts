import axios, { type CreateAxiosDefaults } from "axios";
import { setUpClientSideApiRequestInterceptors } from "#shared/utils/api/interceptors";
import { CLIENT_SIDE_BASE_URL } from "#shared/utils/api/constants";

export const getAppAxiosInstance = () => {
  const commonConfig: CreateAxiosDefaults = {
    adapter: ["fetch", "xhr"],
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  };

  if (import.meta.server) {
    return axios.create({
      ...commonConfig,
      baseURL: process.env.NUXT_BASE_URL,
      headers: {
        ...commonConfig.headers,
        Authorization: "Bearer " + process.env.NUXT_V4_API_KEY,
      },
    });
  }

  const clientSideAxiosInstance = axios.create({
    ...commonConfig,
    baseURL: CLIENT_SIDE_BASE_URL,
  });

  return setUpClientSideApiRequestInterceptors(clientSideAxiosInstance);
};

export const appAxiosInstance = getAppAxiosInstance();
