import { appAxiosInstance } from "#shared/utils/api/api";
import {
  ApiPaths,
  DEFAULT_INCLUDE_LANGUAGE_PARAM,
} from "#shared/utils/api/constants";
import {
  fetchMovieApiDtoSchema,
  fetchMovieApiMapper,
  type FetchMovieApiParams,
} from "./types";

export const fetchMovieApi = (params: FetchMovieApiParams) =>
  appAxiosInstance
    .get(ApiPaths.MoviesApiPaths.fetchMovieApi(params.movieId), {
      params: {
        append_to_response: params.includes?.join() ?? "",
        include_image_language: params.includes
          ? DEFAULT_INCLUDE_LANGUAGE_PARAM
          : "",
      },
    })
    .then((res) => fetchMovieApiMapper(fetchMovieApiDtoSchema.parse(res.data)));
