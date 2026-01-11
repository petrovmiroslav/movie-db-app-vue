import { queryOptions, useQuery } from "@tanstack/vue-query";
import { fetchGenresApi } from "./api/fetchGenresApi/fetchGenresApi";

export const genresQueries = {
  _def: ["genres"],
  list: () =>
    queryOptions({
      queryKey: [...genresQueries._def, "list"] as const,
      queryFn: fetchGenresApi,
      staleTime: Infinity,
    }),
} as const;

export const useGenreListQuery = () => {
  const query = useQuery(genresQueries.list());
  onServerPrefetch(query.suspense);
  return query;
};
