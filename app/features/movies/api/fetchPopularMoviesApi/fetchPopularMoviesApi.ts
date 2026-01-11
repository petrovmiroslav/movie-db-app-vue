import { appAxiosInstance } from "#shared/utils/api/api";
import { ApiPaths } from "#shared/utils/api/constants";
import {
  paginationDtoMapper,
  PaginationDtoSchema,
} from "~/utils/pagination/pagination";
import {
  fetchPopularMoviesApiDtoSchema,
  fetchPopularMoviesApiMapper,
  type FetchPopularMoviesApiParams,
} from "./types";

export const fetchPopularMoviesApi = (params: FetchPopularMoviesApiParams) =>
  appAxiosInstance
    .get(ApiPaths.MoviesApiPaths.fetchPopularMoviesApi, {
      params,
    })
    .then((res) =>
      paginationDtoMapper(
        PaginationDtoSchema.extend({
          results: fetchPopularMoviesApiDtoSchema,
        }).parse(res.data),
        fetchPopularMoviesApiMapper,
      ),
    );
