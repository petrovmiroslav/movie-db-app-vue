<template><slot /></template>

<script setup lang="ts">
import type { Genre } from "~/features/genres/types";
import { useGenreListQuery } from "~/features/genres/queries";
import {
  type GenresDict,
  provideGenresDict,
} from "~/features/genres/components/GenresDictProvider/useGenresDict";

const createGenresDict = (genreList: Genre[] | undefined): GenresDict => {
  const dictionary: GenresDict = {};
  genreList?.forEach((genre) => {
    dictionary[genre.id] = genre;
  });

  return dictionary;
};

const genreListQuery = useGenreListQuery();

const genresDict = computed(() =>
  createGenresDict(genreListQuery.data.value?.genres),
);

provideGenresDict(genresDict);
</script>
