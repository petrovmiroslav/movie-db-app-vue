import { appAxiosInstance } from "#shared/utils/api/api";
import { ApiPaths } from "#shared/utils/api/constants";
import { fetchGenresApiDtoSchema, fetchGenresApiMapper } from "./types";

export const fetchGenresApi = () =>
  appAxiosInstance
    .get(ApiPaths.GenresApiPaths.fetchGenresApi)
    .then((res) =>
      fetchGenresApiMapper(fetchGenresApiDtoSchema.parse(res.data)),
    );
