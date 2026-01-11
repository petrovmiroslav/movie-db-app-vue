import {
  AsyncStorageKeys,
  getAsyncStorageData,
} from "~/utils/asyncStorage/asyncStorage";
import { type FavoriteDto } from "../../types";
import { fetchFavoritesApiDtoSchema, fetchFavoritesApiMapper } from "./types";

export const fetchFavoritesApi = () =>
  new Promise((resolve, reject) =>
    setTimeout(
      () =>
        getAsyncStorageData(AsyncStorageKeys.FAVORITES).then(resolve, reject),
      100,
    ),
  )
    .then((favorites): { data: FavoriteDto[] } => {
      return {
        data: fetchFavoritesApiDtoSchema.parse(favorites ?? []),
      };
    })
    .then(({ data }) => fetchFavoritesApiMapper(data));
