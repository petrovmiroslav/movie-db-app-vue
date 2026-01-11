import { appAxiosInstance } from "#shared/utils/api/api";
import { ApiPaths } from "#shared/utils/api/constants";
import {
  paginationDtoMapper,
  PaginationDtoSchema,
} from "~/utils/pagination/pagination";
import {
  fetchSimilarMoviesApiDtoSchema,
  fetchSimilarMoviesApiMapper,
  type FetchSimilarMoviesApiParams,
} from "./types";

export const fetchSimilarMoviesApi = (params: FetchSimilarMoviesApiParams) =>
  appAxiosInstance
    .get(ApiPaths.MoviesApiPaths.fetchSimilarMoviesApi(params.movieId), {
      params,
    })
    .then((res) =>
      paginationDtoMapper(
        PaginationDtoSchema.extend({
          results: fetchSimilarMoviesApiDtoSchema,
        }).parse(res.data),
        fetchSimilarMoviesApiMapper,
      ),
    );
