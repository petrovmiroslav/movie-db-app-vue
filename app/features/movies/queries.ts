import {
  infiniteQueryOptions,
  queryOptions,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/vue-query";
import type { RefOrGetter } from "#shared/utils/types/types";
import { type FetchPopularMoviesApiParams } from "./api/fetchPopularMoviesApi/types";
import { fetchPopularMoviesApi } from "./api/fetchPopularMoviesApi/fetchPopularMoviesApi";
import { type FetchTopRatedMoviesApiParams } from "./api/fetchTopRatedMoviesApi/types";
import { fetchTopRatedMoviesApi } from "./api/fetchTopRatedMoviesApi/fetchTopRatedMoviesApi";
import { fetchMovieApi } from "./api/fetchMovieApi/fetchMovieApi";
import { type FetchMovieApiParams } from "./api/fetchMovieApi/types";
import { fetchRecommendationsMoviesApi } from "./api/fetchRecommendationsMoviesApi/fetchRecommendationsMoviesApi";
import { type FetchRecommendationsMoviesApiParams } from "./api/fetchRecommendationsMoviesApi/types";
import { fetchSimilarMoviesApi } from "./api/fetchSimilarMoviesApi/fetchSimilarMoviesApi";
import { type FetchSimilarMoviesApiParams } from "./api/fetchSimilarMoviesApi/types";
import { searchMoviesApi } from "./api/searchMoviesApi/searchMoviesApi";
import { type SearchMoviesApiParams } from "./api/searchMoviesApi/types";
import { discoverMovieApi } from "./api/discoverMovieApi/discoverMovieApi";
import { type DiscoverMovieApiParams } from "./api/discoverMovieApi/types";
import { getNextPageNumber } from "~/utils/pagination/pagination";

const moviesQueries = {
  _def: ["movies"],
  movie: (params: FetchMovieApiParams | null | undefined) => {
    return queryOptions({
      queryKey: [...moviesQueries._def, "movie", { ...params }] as const,
      queryFn: () =>
        params
          ? fetchMovieApi({
              ...params,
            })
          : Promise.reject(new Error("Invalid params")),
      enabled: Boolean(params),
    });
  },
  popularInfiniteList: (
    params: FetchPopularMoviesApiParams | null | undefined,
  ) => {
    return infiniteQueryOptions({
      queryKey: [
        ...moviesQueries._def,
        "popularInfiniteList",
        { ...params },
      ] as const,
      queryFn: (ctx) =>
        params
          ? fetchPopularMoviesApi({
              ...params,
              page: ctx?.pageParam ?? 1,
            })
          : Promise.reject(new Error("Invalid params")),
      enabled: Boolean(params),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => getNextPageNumber(lastPage),
    });
  },
  topRatedInfiniteList: (
    params: FetchTopRatedMoviesApiParams | null | undefined,
  ) => {
    return infiniteQueryOptions({
      queryKey: [
        ...moviesQueries._def,
        "topRatedInfiniteList",
        { ...params },
      ] as const,
      queryFn: (ctx) =>
        params
          ? fetchTopRatedMoviesApi({
              ...params,
              page: ctx?.pageParam ?? 1,
            })
          : Promise.reject(new Error("Invalid params")),
      enabled: Boolean(params),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => getNextPageNumber(lastPage),
    });
  },
  recommendationsInfiniteList: (
    params: FetchRecommendationsMoviesApiParams | null | undefined,
  ) => {
    return infiniteQueryOptions({
      queryKey: [
        ...moviesQueries._def,
        "recommendationsInfiniteList",
        { ...params },
      ] as const,
      queryFn: (ctx) =>
        params
          ? fetchRecommendationsMoviesApi({
              ...params,
              page: ctx?.pageParam ?? 1,
            })
          : Promise.reject(new Error("Invalid params")),
      enabled: Boolean(params),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => getNextPageNumber(lastPage),
    });
  },
  similarInfiniteList: (
    params: FetchSimilarMoviesApiParams | null | undefined,
  ) => {
    return infiniteQueryOptions({
      queryKey: [
        ...moviesQueries._def,
        "similarInfiniteList",
        { ...params },
      ] as const,
      queryFn: (ctx) =>
        params
          ? fetchSimilarMoviesApi({
              ...params,
              page: ctx?.pageParam ?? 1,
            })
          : Promise.reject(new Error("Invalid params")),
      enabled: Boolean(params),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => getNextPageNumber(lastPage),
    });
  },
  searchMovieInfiniteList: (
    params: SearchMoviesApiParams | null | undefined,
  ) => {
    return infiniteQueryOptions({
      queryKey: [
        ...moviesQueries._def,
        "searchMovieInfiniteList",
        { ...params },
      ] as const,
      queryFn: (ctx) =>
        params
          ? searchMoviesApi({
              ...params,
              page: ctx?.pageParam ?? 1,
            })
          : Promise.reject(new Error("Invalid params")),
      enabled: Boolean(params),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => getNextPageNumber(lastPage),
    });
  },
  discoverMovieInfiniteList: (
    params: DiscoverMovieApiParams | null | undefined,
  ) => {
    return infiniteQueryOptions({
      queryKey: [
        ...moviesQueries._def,
        "discoverMovieInfiniteList",
        { ...params },
      ] as const,
      queryFn: (ctx) =>
        params
          ? discoverMovieApi({
              ...params,
              page: ctx?.pageParam ?? 1,
            })
          : Promise.reject(new Error("Invalid params")),
      enabled: Boolean(params),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => getNextPageNumber(lastPage),
    });
  },
} as const;
export default moviesQueries;

export const useMovieQuery = (
  params: RefOrGetter<Parameters<typeof moviesQueries.movie>[0]>,
) => {
  const query = useQuery(() => toValue(moviesQueries.movie(toValue(params))));
  onServerPrefetch(query.suspense);
  return query;
};

export const usePopularMovieInfiniteListQuery = () => {
  const query = useInfiniteQuery(() =>
    toValue(moviesQueries.popularInfiniteList({})),
  );
  onServerPrefetch(query.suspense);
  return query;
};

export const useTopRatedMovieInfiniteListQuery = () => {
  const query = useInfiniteQuery(() =>
    toValue(moviesQueries.topRatedInfiniteList({})),
  );
  onServerPrefetch(query.suspense);
  return query;
};

export const useRecommendationsMovieInfiniteListQuery = (
  params: RefOrGetter<
    Parameters<typeof moviesQueries.recommendationsInfiniteList>[0]
  >,
) => {
  const query = useInfiniteQuery(() =>
    toValue(moviesQueries.recommendationsInfiniteList(toValue(params))),
  );
  onServerPrefetch(query.suspense);
  return query;
};

export const useSimilarMovieInfiniteListQuery = (
  params: RefOrGetter<Parameters<typeof moviesQueries.similarInfiniteList>[0]>,
) => {
  const query = useInfiniteQuery(() =>
    toValue(moviesQueries.similarInfiniteList(toValue(params))),
  );
  onServerPrefetch(query.suspense);
  return query;
};

export const useSearchMovieInfiniteListQuery = (
  params: RefOrGetter<
    Parameters<typeof moviesQueries.searchMovieInfiniteList>[0]
  >,
) => {
  const query = useInfiniteQuery(() =>
    toValue(moviesQueries.searchMovieInfiniteList(toValue(params))),
  );
  onServerPrefetch(query.suspense);
  return query;
};

export const useDiscoverMovieInfiniteListQuery = (
  params: RefOrGetter<
    Parameters<typeof moviesQueries.discoverMovieInfiniteList>[0]
  >,
) => {
  const query = useInfiniteQuery(() =>
    toValue(moviesQueries.discoverMovieInfiniteList(toValue(params))),
  );
  onServerPrefetch(query.suspense);
  return query;
};
