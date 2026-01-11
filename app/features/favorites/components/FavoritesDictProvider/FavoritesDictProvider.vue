<template><slot /></template>

<script setup lang="ts">
import type { Favorite } from "~/features/favorites/types";
import { useFavoritesQuery } from "~/features/favorites/queries";
import {
  type FavoritesDict,
  provideFavoritesDict,
} from "~/features/favorites/components/FavoritesDictProvider/useFavoritesDict";

const createFavoritesDict = (
  favoriteList: Favorite[] | undefined,
): FavoritesDict => {
  const dictionary: FavoritesDict = {};
  favoriteList?.forEach((favorite) => {
    if (favorite.entityId) {
      dictionary[favorite.entityId] = favorite;
    }
  });

  return dictionary;
};

const favoritesQuery = useFavoritesQuery();

const favoritesDict = computed(() =>
  createFavoritesDict(favoritesQuery.data.value),
);

provideFavoritesDict(favoritesDict);
</script>
