<template>
  <MovieCardHorizontal
    :id="movieId"
    :baseUrl="imageConfiguration.secureBaseUrl"
    :title="movieQuery.data.value?.title"
    :posterPath="movieQuery.data.value?.posterPath"
  >
    <TitleMovieCard>{{ movieQuery.data.value?.title }}</TitleMovieCard>
    <OriginalTitleMovieCard
      >{{ movieQuery.data.value?.originalTitle
      }}{{ movieQuery.data.value?.originalTitle && releaseDateFormatted && ", "
      }}{{ releaseDateFormatted }}</OriginalTitleMovieCard
    >
    <GenresNames
      :class="$style.genres"
      :genreList="movieQuery.data.value?.genres"
      :genreIdList="movieQuery.data.value?.genresIds"
    />

    <div :class="$style.row">
      <p v-if="roundedVote !== undefined" :class="$style.voteAverage">
        {{ roundedVote }}
        <span :class="$style.duration">{{ formattedDuration }}</span>
      </p>

      <p :class="$style.favoriteDate">{{ formattedFavoriteDate }}</p>
    </div>
  </MovieCardHorizontal>
</template>

<script lang="ts" setup>
import type { MovieId } from "~/features/movies/types";
import MovieCardHorizontal from "~/features/movies/components/MovieCardHorizontal/MovieCardHorizontal.vue";
import GenresNames from "~/features/genres/components/GenresNames/GenresNames.vue";
import {
  convertMinutesToDuration,
  formatDurationToDigitsString,
  getFormattedDateMonthYear,
  getFormattedDateYear,
} from "~/utils/dates/dates";
import { getRoundedVote } from "~/features/movies/utils/utils";
import TitleMovieCard from "~/features/movies/components/TitleMovieCard/TitleMovieCard.vue";
import OriginalTitleMovieCard from "~/features/movies/components/OriginalTitleMovieCard/OriginalTitleMovieCard.vue";
import type { Favorite } from "~/features/favorites/types";
import { AppendToResponse } from "~/features/movies/api/fetchMovieApi/types";
import { useMovieQuery } from "~/features/movies/queries";
import { useConfiguration } from "~/features/configuration/components/ConfigurationProvider/useConfiguration";

const props = defineProps<Pick<Favorite, "entityId" | "date">>();

const movieId = computed(() => props.entityId as MovieId);

const useMovieQueryParams = computed(() => {
  return movieId.value
    ? { movieId: movieId.value, includes: [AppendToResponse.IMAGES] }
    : null;
});

const movieQuery = useMovieQuery(useMovieQueryParams);

const releaseDateFormatted = computed(
  () => getFormattedDateYear(movieQuery.data.value?.releaseDate) ?? "",
);

const roundedVote = computed(() => {
  const voteAverage = movieQuery.data.value?.voteAverage;
  return voteAverage !== undefined ? getRoundedVote(voteAverage) : undefined;
});

const formattedDuration = computed(() => {
  const runtime = movieQuery.data.value?.runtime;
  if (runtime === null || runtime === undefined) return "";
  return formatDurationToDigitsString(convertMinutesToDuration(runtime));
});

const formattedFavoriteDate = computed(() =>
  getFormattedDateMonthYear(props.date),
);

const configuration = useConfiguration();

const imageConfiguration = computed(() => configuration?.value?.images ?? {});
</script>

<style lang="scss" module>
.genres {
  font: var(--fonts__s);
}

.voteAverage {
  margin-top: var(--dp__16);
  color: var(--colors__primary);
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.duration {
  font: var(--fonts__s);
  color: var(--colors__font_medium);
}

.favoriteDate {
  font: var(--fonts__s);
  color: var(--colors__font_light);
}
</style>
