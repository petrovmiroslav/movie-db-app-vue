<template>
  <template v-if="moviesList?.length">
    <SectionHeader :class="$style.sectionHeader">{{
      headerText
    }}</SectionHeader>
    <MoviesSlider :moviesList="moviesList" @onEndReached="onLoadMore" />
  </template>
</template>

<script setup lang="ts">
import type { MovieId } from "~/features/movies/types";
import {
  useRecommendationsMovieInfiniteListQuery,
  useSimilarMovieInfiniteListQuery,
} from "~/features/movies/queries";
import { uniqBy } from "~/utils/functions/functions";
import SectionHeader from "~/components/ui/headers/SectionHeader/SectionHeader.vue";
import MoviesSlider from "~/features/movies/components/MoviesSlider/MoviesSlider.vue";

const props = defineProps<{
  headerText: string;
  movieId: MovieId;
  useMoviesQuery:
    | typeof useRecommendationsMovieInfiniteListQuery
    | typeof useSimilarMovieInfiniteListQuery;
}>();

const moviesQuery = props.useMoviesQuery(() => ({ movieId: props.movieId }));

const moviesList = computed(() => {
  const pages = moviesQuery.data.value?.pages;
  if (!pages?.length) return;

  const list = pages?.flatMap((page) => page?.results ?? []);

  return list && uniqBy(list, (movie) => movie.id);
});

const onLoadMore = () => {
  moviesQuery.hasNextPage.value &&
    !moviesQuery.isFetching.value &&
    moviesQuery.fetchNextPage();
};
</script>

<style lang="scss" module>
.sectionHeader {
  margin-top: var(--dp__24);
}
</style>
