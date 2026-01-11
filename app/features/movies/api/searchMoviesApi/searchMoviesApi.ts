import { appAxiosInstance } from "#shared/utils/api/api";
import { ApiPaths } from "#shared/utils/api/constants";
import {
  paginationDtoMapper,
  PaginationDtoSchema,
} from "~/utils/pagination/pagination";
import {
  searchMoviesApiDtoSchema,
  searchMoviesApiMapper,
  type SearchMoviesApiParams,
} from "./types";

export const searchMoviesApi = (params: SearchMoviesApiParams) =>
  appAxiosInstance
    .get(ApiPaths.MoviesApiPaths.searchMoviesApi, {
      params,
    })
    .then((res) =>
      paginationDtoMapper(
        PaginationDtoSchema.extend({ results: searchMoviesApiDtoSchema }).parse(
          res.data,
        ),
        searchMoviesApiMapper,
      ),
    );
