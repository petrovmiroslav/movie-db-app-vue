<template>
  <template v-if="movieId">
    <div :class="$style.container">
      <Header
        :heroImageVisibleHeight="heroImageVisibleHeight"
        :scrollY="scrollY"
        >{{ movieData.title }}</Header
      >

      <Hero
        :id="movieId"
        :title="movieData.title"
        :originalTitle="movieData.originalTitle"
        :voteAverage="movieData.voteAverage"
        :releaseDate="movieData.releaseDate"
        :runtime="movieData.runtime"
        :backdropPath="movieData.backdropPath"
        :genreIdList="movieData.genresIds"
        :genreList="movieData.genres"
        v-model="heroImageVisibleHeight"
        :scrollY="scrollY"
      />

      <Content
        :id="movieId"
        :title="movieData.title"
        :tagline="movieData.tagline"
        :overview="movieData.overview"
        :backdrops="movieData.images?.backdrops"
        :posters="movieData.images?.posters"
      />
    </div>
  </template>
</template>

<script setup lang="ts">
import {
  AppendToResponse,
  type FetchMovieApiResponse,
} from "~/features/movies/api/fetchMovieApi/types";
import { useMovieQuery } from "~/features/movies/queries";
import { throttle } from "~/utils/functions/functions";
import type { MovieId } from "~/features/movies/types";
import Header from "~/sections/Movie/Header/Header.vue";
import Hero from "~/sections/Movie/Hero/Hero.vue";
import Content from "~/sections/Movie/Content/Content.vue";

definePageMeta({
  layout: "page-layout",
});

const route = useRoute();

const movieId = computed(() => route.params.movieId as unknown as MovieId);

const useMovieQueryParams = computed(() => {
  return movieId.value
    ? {
        movieId: movieId.value,
        includes: [AppendToResponse.IMAGES],
      }
    : null;
});

const movieQuery = useMovieQuery(useMovieQueryParams);

const movieData = computed<Partial<FetchMovieApiResponse>>(
  () => movieQuery.data.value ?? {},
);

const scrollY = ref(0);
const heroImageVisibleHeight = ref(0);

const scrollHandler = throttle(() => {
  scrollY.value = window.scrollY;
}, 16);

onMounted(() => {
  window.addEventListener("scroll", scrollHandler, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", scrollHandler);
});

useSeoMeta({
  title: () => movieData.value.title,
});
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: visible;
}
</style>
