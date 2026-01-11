<template>
  <section :class="[commonCss.contentContainer, $style.container]">
    <Image
      ref="imageComponent"
      :class="[
        $style.imageContainer,
        !heroImageVisibleHeight && $style.image_hidden,
      ]"
      :style="containerStyle"
      :src="backdropPath ?? ''"
      :baseUrl="imageConfiguration.secureBaseUrl"
      :alt="title"
    />
    <div :class="$style.content">
      <h2 :class="$style.title">
        {{ title }}
      </h2>
      <p :class="$style.text">
        <span
          v-if="roundedVote !== undefined"
          :class="[$style.text, $style.text_vote]"
          >{{ roundedVote }}</span
        >

        {{ originalTitle }}
      </p>

      <p :class="$style.text">
        {{ releaseDateFormatted
        }}{{ releaseDateFormatted && formattedDuration && ", "
        }}{{ formattedDuration }}
      </p>

      <GenresNames
        :class="[$style.text, $style.text_genres]"
        :genreList="genreList"
        :genreIdList="genreIdList"
      />

      <FavoriteButton :class="$style.favoriteButton" :movieId="id" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Movie } from "~/features/movies/types";
import GenresNames from "~/features/genres/components/GenresNames/GenresNames.vue";
import { useConfiguration } from "~/features/configuration/components/ConfigurationProvider/useConfiguration";
import { getRoundedVote } from "~/features/movies/utils/utils";
import {
  convertMinutesToDuration,
  formatDurationToString,
  getFormattedDateYear,
} from "~/utils/dates/dates";
import { createInterpolation } from "~/utils/interpolate/interpolate";
import { useWindowSize } from "~/composables/WindowSizeProvider/useWindowSize";
import { commonCss } from "~/utils/styles/styles";
import Image from "~/features/images/Image/Image.vue";
import FavoriteButton from "~/features/favorites/components/FavoriteButton/FavoriteButton.vue";

const HERO_IMAGE_MAX_SCALE_VALUE = 1.5;
const HERO_IMAGE_MIN_SCALE_VALUE = 1;

const props = defineProps<
  {
    scrollY: number;
    genreList: InstanceType<typeof GenresNames>["genreList"];
    genreIdList: InstanceType<typeof GenresNames>["genreIdList"];
  } & Pick<
    Movie,
    | "id"
    | "title"
    | "originalTitle"
    | "voteAverage"
    | "backdropPath"
    | "releaseDate"
    | "runtime"
  >
>();

const heroImageVisibleHeight = defineModel<number>({ required: true });

const configuration = useConfiguration();

const imageConfiguration = computed(() => configuration?.value?.images ?? {});

const roundedVote = computed(() => {
  const voteAverage = props.voteAverage;
  return voteAverage !== undefined ? getRoundedVote(voteAverage) : undefined;
});

const releaseDateFormatted = computed(
  () => getFormattedDateYear(props.releaseDate) ?? "",
);

const formattedDuration = computed(() => {
  const runtime = props.runtime;
  if (runtime === null || runtime === undefined) return "";
  return formatDurationToString(convertMinutesToDuration(runtime));
});

// for hero image animation on scroll
const scaleInterpolation = computed(() =>
  createInterpolation({
    inputRange: [
      -heroImageVisibleHeight.value,
      heroImageVisibleHeight.value / 2,
    ],
    outputRange: [HERO_IMAGE_MAX_SCALE_VALUE, HERO_IMAGE_MIN_SCALE_VALUE],
    extrapolate: "clamp",
  }),
);

const containerStyle = computed(() => ({
  transform: `translateZ(0) scale(${scaleInterpolation.value(props.scrollY)})`,
}));

const windowSize = useWindowSize();

const imageComponent = useTemplateRef("imageComponent");

const setHeroImageVisibleHeight = () => {
  heroImageVisibleHeight.value =
    imageComponent.value?.imageContainer?.offsetHeight ?? 0;
};

watch(() => windowSize.value.innerWidth, setHeroImageVisibleHeight);
onMounted(setHeroImageVisibleHeight);
</script>

<style lang="scss" module>
.container {
  padding: 0;
  position: relative;
}

.imageContainer {
  height: 45vh;
  position: relative;
  background-color: var(--colors__placeholder);
  transform: translateZ(0);
}

.image_hidden {
  opacity: 0;
}

.content {
  min-height: 24rem;
  padding: var(--dp__24) var(--dp__16) var(--dp__48);
  position: relative;
  background-color: var(--colors__background_very_dark);
}

.title {
  margin-bottom: var(--dp__16);
  font: var(--fonts__header_l);
  text-align: center;
  color: var(--colors__background_light);
}

.text {
  font: var(--fonts__header_s);
  text-align: center;
  color: var(--colors__font_extra_light);
}

.text_vote {
  color: var(--colors__primary);
}

.text_genres {
  overflow: visible;
}

.favoriteButton {
  display: block;
  margin: var(--dp__8) auto;
}
</style>
