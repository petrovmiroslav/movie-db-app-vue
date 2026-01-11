import { appAxiosInstance } from "#shared/utils/api/api";
import { ApiPaths } from "#shared/utils/api/constants";
import {
  fetchConfigurationApiDtoSchema,
  fetchConfigurationApiMapper,
} from "./types";

export const fetchConfigurationApi = () =>
  appAxiosInstance
    .get(ApiPaths.ConfigurationApiPaths.fetchConfigurationApi)
    .then((res) =>
      fetchConfigurationApiMapper(
        fetchConfigurationApiDtoSchema.parse(res.data),
      ),
    );
