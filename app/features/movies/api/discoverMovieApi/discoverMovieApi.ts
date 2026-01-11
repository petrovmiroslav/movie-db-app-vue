import { appAxiosInstance } from "#shared/utils/api/api";
import { ApiPaths } from "#shared/utils/api/constants";
import {
  paginationDtoMapper,
  PaginationDtoSchema,
} from "~/utils/pagination/pagination";
import {
  discoverMovieApiDtoSchema,
  discoverMovieApiMapper,
  type DiscoverMovieApiParams,
} from "./types";

export const discoverMovieApi = (params: DiscoverMovieApiParams) =>
  appAxiosInstance
    .get(ApiPaths.MoviesApiPaths.discoverMovieApi, {
      params,
    })
    .then((res) =>
      paginationDtoMapper(
        PaginationDtoSchema.extend({
          results: discoverMovieApiDtoSchema,
        }).parse(res.data),
        discoverMovieApiMapper,
      ),
    );
