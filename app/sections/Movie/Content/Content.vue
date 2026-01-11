<template>
  <section :class="[commonCss.contentContainer, $style.container]">
    <p v-if="tagline" :class="$style.tagline">{{ tagline }}</p>
    <p v-if="overview" :class="$style.overview">{{ overview }}</p>

    <MovieImagesSlider
      headerText="Posters"
      :isPosters="true"
      :title="title"
      :baseUrl="imageConfiguration.secureBaseUrl"
      :imageList="posters"
    />
    <MovieImagesSlider
      headerText="Backdrops"
      :isPosters="false"
      :title="title"
      :baseUrl="imageConfiguration.secureBaseUrl"
      :imageList="backdrops"
    />

    <SuggestedMoviesSlider
      headerText="Recommendations"
      :movieId="id"
      :useMoviesQuery="useRecommendationsMovieInfiniteListQuery"
    />

    <SuggestedMoviesSlider
      headerText="Similar"
      :movieId="id"
      :useMoviesQuery="useSimilarMovieInfiniteListQuery"
    />
  </section>
</template>

<script lang="ts" setup>
import type { Movie } from "~/features/movies/types";
import type { Image } from "~/features/images/types";
import { useConfiguration } from "~/features/configuration/components/ConfigurationProvider/useConfiguration";
import { commonCss } from "~/utils/styles/styles";
import MovieImagesSlider from "~/sections/Movie/Content/MovieImagesSlider/MovieImagesSlider.vue";
import {
  useRecommendationsMovieInfiniteListQuery,
  useSimilarMovieInfiniteListQuery,
} from "~/features/movies/queries";
import SuggestedMoviesSlider from "~/sections/Movie/Content/SuggestedMoviesSlider/SuggestedMoviesSlider.vue";

defineProps<
  {
    backdrops: Image[] | undefined;
    posters: Image[] | undefined;
  } & Pick<Movie, "id" | "title" | "tagline" | "overview">
>();

const configuration = useConfiguration();

const imageConfiguration = computed(() => configuration?.value?.images ?? {});
</script>

<style lang="scss" module>
.container {
  margin-top: calc(-1 * var(--dp__16));
  padding-top: var(--dp__32);
  padding-bottom: calc(var(--dp__64) + var(--tabBarMinHeight));
  flex-grow: 1;
  position: relative;
  border-top-left-radius: var(--dp__16);
  border-top-right-radius: var(--dp__16);
  background-color: var(--colors__background_light);
  box-shadow: var(--shadow__16dp);

  &:before {
    content: "";
    display: block;
    width: var(--dp__32);
    height: 0.2rem;
    margin: auto;
    position: absolute;
    top: 0.6rem;
    left: 0;
    right: 0;
    border-radius: 0.2rem;
    background-color: var(--colors__background_dark);
  }

  :global(.dark) &:before {
    background-color: var(--colors__background_very_dark);
  }

  :global(.dark) & {
    background-color: var(--colors__background_dark);
  }
}

.tagline {
  margin-top: var(--dp__16);
  font: var(--fonts__header_s);
}

.overview {
  margin-top: var(--dp__8);
}
</style>
