<template>
  <Image
    :class="$style.poster"
    :src="posterPath ?? ''"
    :base-url="baseUrl"
    :alt="title"
  />
</template>

<script setup lang="ts">
import type { Movie } from "~/features/movies/types";
import Image from "~/features/images/Image/Image.vue";

defineProps<{
  title: Movie["title"] | undefined;
  posterPath: Movie["posterPath"] | undefined;
  baseUrl: InstanceType<typeof Image>["baseUrl"];
}>();
</script>

<style lang="scss" module>
.poster {
  position: relative;
  border-radius: var(--dp__8);
  background-color: var(--colors__placeholder);
  overflow: hidden;

  &:before {
    content: "";
    display: block;
    padding-bottom: calc(100% / var(--poster_aspect_ratio));
  }
}
</style>
