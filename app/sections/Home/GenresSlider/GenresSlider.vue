<template>
  <section :class="commonCss.contentContainer">
    <SectionHeader>Genres</SectionHeader>

    <div :class="$style.slider">
      <GenresSliderItem
        v-for="genre in genreListQuery.data.value?.genres"
        :key="genre.id"
        :id="genre.id"
        :name="genre.name"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useGenreListQuery } from "~/features/genres/queries";
import { commonCss } from "~/utils/styles/styles";
import SectionHeader from "~/components/ui/headers/SectionHeader/SectionHeader.vue";
import GenresSliderItem from "~/sections/Home/GenresSlider/GenresSliderItem/GenresSliderItem.vue";

const genreListQuery = useGenreListQuery();
</script>

<style lang="scss" module>
.slider {
  display: flex;
  margin: 0 calc(-1 * var(--content-padding)) var(--dp__64);
  padding: var(--dp__8);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding: 0 var(--dp__8);
}
</style>
