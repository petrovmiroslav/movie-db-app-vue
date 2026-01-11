<template>
  <Link :to="link" :class="$style.card"
    ><Poster
      :class="$style.posterContainer"
      :baseUrl="baseUrl"
      :title="title"
      :posterPath="posterPath"
    />
    <TitleMovieCard :class="$style.title">{{ title }}</TitleMovieCard>
    <GenresNames
      :class="$style.genres"
      :genreList="genreList"
      :genreIdList="genreIdList"
    />
    <p v-if="roundedVote !== undefined" :class="$style.voteAverage">
      {{ roundedVote }}
    </p>
  </Link>
</template>

<script setup lang="ts">
import { APP_PATHS } from "~/utils/navigation/constants";
import Link from "~/components/ui/links/Link/Link.vue";
import type { Movie } from "~/features/movies/types";
import { getRoundedVote } from "~/features/movies/utils/utils";
import Poster from "~/features/movies/components/Poster/Poster.vue";
import TitleMovieCard from "~/features/movies/components/TitleMovieCard/TitleMovieCard.vue";
import GenresNames from "~/features/genres/components/GenresNames/GenresNames.vue";

const props = defineProps<{
  id: Movie["id"];
  title: Movie["title"];
  voteAverage: Movie["voteAverage"];
  baseUrl: InstanceType<typeof Poster>["baseUrl"];
  posterPath: InstanceType<typeof Poster>["posterPath"];
  genreList: InstanceType<typeof GenresNames>["genreList"];
  genreIdList: InstanceType<typeof GenresNames>["genreIdList"];
}>();

const roundedVote = computed(() => {
  const voteAverage = props.voteAverage;
  if (voteAverage === undefined) return;

  return getRoundedVote(voteAverage);
});

const link = computed(() => APP_PATHS.movie(props.id));
</script>

<style module lang="scss">
.card {
  display: block;
  width: 42%;
  max-width: 22rem;
  flex-shrink: 0;
  padding: var(--dp__16);
  position: relative;
  border-radius: var(--dp__8);
  color: var(--colors__font_dark);
  scroll-snap-align: start;
}

.posterContainer {
  box-shadow: var(--shadow__2dp);
}

.title {
  --linesToShow: 2;
  margin-top: var(--dp__8);
}

.genres {
  font: var(--fonts__m);
}

.voteAverage {
  padding: 0 var(--dp__8);
  position: absolute;
  top: var(--dp__12);
  left: var(--dp__4);
  border-radius: var(--dp__4);
  background-color: var(--colors__primary);
  box-shadow: var(--shadow__4dp);
  font: var(--fonts__s);
  color: var(--colors__background_light);
}
</style>
