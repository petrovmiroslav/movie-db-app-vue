<template>
  <MovieCardHorizontal
    :id="id"
    :baseUrl="baseUrl"
    :title="title"
    :posterPath="posterPath"
  >
    <TitleMovieCard>{{ title }}</TitleMovieCard>
    <OriginalTitleMovieCard
      >{{ originalTitle }}{{ originalTitle && releaseDateFormatted && ", "
      }}{{ releaseDateFormatted }}</OriginalTitleMovieCard
    >
    <GenresNames
      :class="$style.genres"
      :genreList="genreList"
      :genreIdList="genreIdList"
    />

    <p v-if="roundedVote !== undefined" :class="$style.voteAverage">
      {{ roundedVote }}
    </p>
  </MovieCardHorizontal>
</template>

<script lang="ts" setup>
import type { Movie } from "~/features/movies/types";
import MovieCardHorizontal from "~/features/movies/components/MovieCardHorizontal/MovieCardHorizontal.vue";
import GenresNames from "~/features/genres/components/GenresNames/GenresNames.vue";
import { getFormattedDateYear } from "~/utils/dates/dates";
import { getRoundedVote } from "~/features/movies/utils/utils";
import TitleMovieCard from "~/features/movies/components/TitleMovieCard/TitleMovieCard.vue";
import OriginalTitleMovieCard from "~/features/movies/components/OriginalTitleMovieCard/OriginalTitleMovieCard.vue";

const props = defineProps<
  {
    baseUrl: InstanceType<typeof MovieCardHorizontal>["baseUrl"];
    posterPath: InstanceType<typeof MovieCardHorizontal>["posterPath"];
    genreList: InstanceType<typeof GenresNames>["genreList"];
    genreIdList: InstanceType<typeof GenresNames>["genreIdList"];
  } & Pick<
    Movie,
    "id" | "title" | "originalTitle" | "releaseDate" | "voteAverage"
  >
>();

const releaseDateFormatted = computed(
  () => getFormattedDateYear(props.releaseDate) ?? "",
);

const roundedVote = computed(() => {
  const voteAverage = props.voteAverage;
  return voteAverage !== undefined ? getRoundedVote(voteAverage) : undefined;
});
</script>

<style lang="scss" module>
.genres {
  font: var(--fonts__s);
}

.voteAverage {
  margin-top: var(--dp__16);
  color: var(--colors__primary);
}
</style>
