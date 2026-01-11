import { queryOptions, useQuery } from "@tanstack/vue-query";
import { fetchConfigurationApi } from "./api/fetchConfigurationApi/fetchConfigurationApi";

export const configurationQueries = {
  _def: ["configuration"],
  configuration: () =>
    queryOptions({
      queryKey: [...configurationQueries._def, "configuration"] as const,
      queryFn: fetchConfigurationApi,
      staleTime: Infinity,
    }),
} as const;

export const useConfigurationQuery = () => {
  const query = useQuery(configurationQueries.configuration());
  onServerPrefetch(query.suspense);
  return query;
};
