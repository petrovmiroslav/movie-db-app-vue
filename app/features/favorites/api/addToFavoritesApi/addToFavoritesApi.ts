import { z } from "zod";
import type { StringDate } from "#shared/utils/types/types";
import {
  AsyncStorageKeys,
  getAsyncStorageData,
  setAsyncStorageData,
} from "~/utils/asyncStorage/asyncStorage";
import { getRandomId } from "~/utils/entities/entities";
import { favoriteDtoSchema } from "../../types";
import { type AddToFavoritesApiParams } from "./types";

export const addToFavoritesApi = async (
  params: AddToFavoritesApiParams,
): Promise<void> => {
  if (params.entityId === undefined)
    throw new Error("Error: addToFavoritesAPi. entityId === undefined");

  const maybeFavorites = await getAsyncStorageData(AsyncStorageKeys.FAVORITES);

  const favoritesList = z.array(favoriteDtoSchema).parse(maybeFavorites ?? []);

  if (
    favoritesList.some(
      (favorite) =>
        favorite.type === params.type && favorite.entity_id === params.entityId,
    )
  ) {
    throw new Error("Error: addToFavoritesAPi. favorite was already added");
  }

  favoritesList.unshift({
    id: getRandomId(),
    type: params.type,
    entity_id: params.entityId,
    date: new Date().toISOString() as StringDate,
  });

  await setAsyncStorageData(AsyncStorageKeys.FAVORITES, favoritesList);
};
