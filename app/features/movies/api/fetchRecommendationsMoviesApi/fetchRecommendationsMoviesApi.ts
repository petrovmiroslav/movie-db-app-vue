import { appAxiosInstance } from "#shared/utils/api/api";
import { ApiPaths } from "#shared/utils/api/constants";
import {
  paginationDtoMapper,
  PaginationDtoSchema,
} from "~/utils/pagination/pagination";
import {
  fetchRecommendationsMoviesApiDtoSchema,
  fetchRecommendationsMoviesApiMapper,
  type FetchRecommendationsMoviesApiParams,
} from "./types";

export const fetchRecommendationsMoviesApi = (
  params: FetchRecommendationsMoviesApiParams,
) =>
  appAxiosInstance
    .get(
      ApiPaths.MoviesApiPaths.fetchRecommendationsMoviesApi(params.movieId),
      {
        params,
      },
    )
    .then((res) =>
      paginationDtoMapper(
        PaginationDtoSchema.extend({
          results: fetchRecommendationsMoviesApiDtoSchema,
        }).parse(res.data),
        fetchRecommendationsMoviesApiMapper,
      ),
    );
