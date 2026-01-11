<template>
  <div :class="$style.container">
    <PageHeader>Main</PageHeader>

    <ChartMovies
      header="Popular"
      :useMoviesQuery="usePopularMovieInfiniteListQuery"
    />
    <ChartMovies
      header="Top rated"
      :useMoviesQuery="useTopRatedMovieInfiniteListQuery"
    />

    <GenresSlider />
  </div>
</template>
<script setup lang="ts">
import {
  usePopularMovieInfiniteListQuery,
  useTopRatedMovieInfiniteListQuery,
} from "~/features/movies/queries";
import ChartMovies from "~/sections/Home/ChartMovies/ChartMovies.vue";
import GenresSlider from "~/sections/Home/GenresSlider/GenresSlider.vue";

definePageMeta({
  layout: "page-layout",
});
</script>

<style lang="scss" module>
.container {
  padding-top: var(--pageHeaderMinHeight);
  padding-bottom: var(--tabBarMinHeight);
}
</style>
