import { appAxiosInstance } from "#shared/utils/api/api";
import { ApiPaths } from "#shared/utils/api/constants";
import {
  paginationDtoMapper,
  PaginationDtoSchema,
} from "~/utils/pagination/pagination";
import {
  fetchTopRatedMoviesApiDtoSchema,
  fetchTopRatedMoviesApiMapper,
  type FetchTopRatedMoviesApiParams,
} from "./types";

export const fetchTopRatedMoviesApi = (params: FetchTopRatedMoviesApiParams) =>
  appAxiosInstance
    .get(ApiPaths.MoviesApiPaths.fetchTopRatedMoviesApi, {
      params,
    })
    .then((res) =>
      paginationDtoMapper(
        PaginationDtoSchema.extend({
          results: fetchTopRatedMoviesApiDtoSchema,
        }).parse(res.data),
        fetchTopRatedMoviesApiMapper,
      ),
    );
