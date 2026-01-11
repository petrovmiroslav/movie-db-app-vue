<template>
  <TitleMovieCard :class="$style.title"><slot /></TitleMovieCard>
</template>

<style module lang="scss">
.title {
  font: var(--fonts__s);
}
</style>

<script setup lang="ts">
import TitleMovieCard from "~/features/movies/components/TitleMovieCard/TitleMovieCard.vue";
</script>
