<template>
  <section v-if="moviesList?.length" :class="commonCss.contentContainer">
    <SectionHeader>{{ header }}</SectionHeader>

    <MoviesSlider
      :moviesList="moviesList"
      @onEndReached="moviesQuery.fetchNextPage"
    />
  </section>
</template>

<script lang="ts" setup>
import { uniqBy } from "~/utils/functions/functions";
import {
  type usePopularMovieInfiniteListQuery,
  useTopRatedMovieInfiniteListQuery,
} from "~/features/movies/queries";
import type { Movie } from "~/features/movies/types";
import { commonCss } from "~/utils/styles/styles";
import SectionHeader from "~/components/ui/headers/SectionHeader/SectionHeader.vue";
import MoviesSlider from "~/features/movies/components/MoviesSlider/MoviesSlider.vue";

const props = defineProps<{
  header: string;
  useMoviesQuery:
    | typeof usePopularMovieInfiniteListQuery
    | typeof useTopRatedMovieInfiniteListQuery;
}>();

const moviesQuery = props.useMoviesQuery();

const moviesList = computed<Movie[] | undefined>(() => {
  const pages = moviesQuery.data.value?.pages;
  if (!pages?.length) return;

  const list = pages?.flatMap((page) => page?.results ?? []);

  return list && uniqBy(list, (movie) => movie.id);
});
</script>
