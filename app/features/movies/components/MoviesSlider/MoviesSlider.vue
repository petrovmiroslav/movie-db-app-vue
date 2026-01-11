<template>
  <div :class="$style.slider" ref="sliderRef">
    <MoviesSliderItem
      v-for="movie in moviesList"
      :key="movie.id"
      :id="movie.id"
      :baseUrl="imageConfiguration.secureBaseUrl"
      :title="movie.title"
      :genreIdList="movie.genresIds"
      :genreList="movie.genres"
      :posterPath="movie.posterPath"
      :voteAverage="movie.voteAverage"
    />

    <div
      v-intersection-observer="[
        onIntersection,
        { root: sliderRef, rootMargin: '0px 100% 0px 0px' },
      ]"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { vIntersectionObserver } from "@vueuse/components";
import type { Movie } from "~/features/movies/types";
import { useConfiguration } from "~/features/configuration/components/ConfigurationProvider/useConfiguration";
import MoviesSliderItem from "~/features/movies/components/MoviesSlider/MoviesSliderItem/MoviesSliderItem.vue";

defineProps<{
  moviesList: Movie[] | undefined;
}>();

const emit = defineEmits<{
  (e: "onEndReached"): void;
}>();

const sliderRef = useTemplateRef("sliderRef");

const configuration = useConfiguration();

const imageConfiguration = computed(() => configuration?.value?.images ?? {});

const onIntersection = (intersections: IntersectionObserverEntry[]) => {
  intersections[0]?.isIntersecting && emit("onEndReached");
};
</script>

<style lang="scss" module>
.slider {
  display: flex;
  margin: 0 calc(-1 * var(--content-padding));
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}
</style>
