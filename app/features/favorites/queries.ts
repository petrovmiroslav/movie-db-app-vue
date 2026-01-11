import {
  queryOptions,
  useMutation,
  type UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/vue-query";
import { fetchFavoritesApi } from "./api/fetchFavoritesApi/fetchFavoritesApi";
import { addToFavoritesApi } from "./api/addToFavoritesApi/addToFavoritesApi";
import { removeFromFavoritesApi } from "./api/removeFromFavoritesApi/removeFromFavoritesApi";

export const favoritesQueries = {
  _def: ["favorites"],
  list: () => {
    return queryOptions({
      queryKey: [...favoritesQueries._def, "list"] as const,
      queryFn: fetchFavoritesApi,
      enabled: !import.meta.server,
    });
  },
} as const;

export const useFavoritesQuery = () => useQuery(favoritesQueries.list());

export const useAddToFavoritesMutation = (
  maybeRefOptions?: UseMutationOptions<
    Awaited<ReturnType<typeof addToFavoritesApi>>,
    Error,
    Parameters<typeof addToFavoritesApi>[0],
    unknown
  >,
) => {
  const queryClient = useQueryClient();
  const options = toValue(maybeRefOptions);

  return useMutation({
    ...options,
    mutationFn: addToFavoritesApi,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: favoritesQueries._def,
      });
      return unref(options?.onSuccess)?.(...args);
    },
  });
};

export const useRemoveFromFavoritesMutation = (
  maybeRefOptions?: UseMutationOptions<
    Awaited<ReturnType<typeof removeFromFavoritesApi>>,
    Error,
    Parameters<typeof removeFromFavoritesApi>[0],
    unknown
  >,
) => {
  const queryClient = useQueryClient();
  const options = unref(maybeRefOptions);

  return useMutation({
    ...options,
    mutationFn: removeFromFavoritesApi,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: favoritesQueries._def,
      });
      return unref(options?.onSuccess)?.(...args);
    },
  });
};
