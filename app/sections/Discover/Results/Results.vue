<template>
  <section :class="[commonCss.contentContainer, $style.container]">
    <ResultItem
      v-for="movie in moviesList"
      :key="movie.id"
      :class="$style.resultItem"
      :id="movie.id"
      :baseUrl="imageConfiguration.secureBaseUrl"
      :title="movie.title"
      :originalTitle="movie.originalTitle"
      :releaseDate="movie.releaseDate"
      :genreIdList="movie.genresIds"
      :genreList="movie.genres"
      :posterPath="movie.posterPath"
      :voteAverage="movie.voteAverage"
    />

    <div
      v-intersection-observer="[onIntersection, { rootMargin: '0px 0px 100%' }]"
    ></div>
  </section>
</template>

<script lang="ts" setup>
import { vIntersectionObserver } from "@vueuse/components";
import { commonCss } from "~/utils/styles/styles";
import { uniqBy } from "~/utils/functions/functions";
import type { DiscoverMovieApiParams } from "~/features/movies/api/discoverMovieApi/types";
import { useDiscoverMovieInfiniteListQuery } from "~/features/movies/queries";
import { useConfiguration } from "~/features/configuration/components/ConfigurationProvider/useConfiguration";
import ResultItem from "~/sections/Discover/Results/ResultItem/ResultItem.vue";

const route = useRoute();

const moviesQuery = useDiscoverMovieInfiniteListQuery(
  () => route.query as unknown as DiscoverMovieApiParams,
);

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

const onIntersection = (intersections: IntersectionObserverEntry[]) => {
  intersections[0]?.isIntersecting && onLoadMore();
};

const configuration = useConfiguration();

const imageConfiguration = computed(() => configuration?.value?.images ?? {});
</script>

<style lang="scss" module>
.container {
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
}

.resultItem {
  margin-bottom: var(--dp__8);
}
</style>
