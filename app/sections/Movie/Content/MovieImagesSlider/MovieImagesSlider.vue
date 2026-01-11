<template>
  <template v-if="imageList?.length">
    <SectionHeader :class="$style.sectionHeader">{{
      headerText
    }}</SectionHeader>
    <div :class="$style.container">
      <div v-for="image in imageList" :key="image.id" :class="$style.item">
        <ImageComponent
          :class="[
            $style.item__imgContainer,
            isPosters && $style.item__imgContainer_poster,
          ]"
          :src="image.filePath"
          :baseUrl="baseUrl"
          :alt="title"
        />
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import type { Movie } from "~/features/movies/types";
import type { Image } from "~/features/images/types";
import ImageComponent from "~/features/images/Image/Image.vue";
import SectionHeader from "~/components/ui/headers/SectionHeader/SectionHeader.vue";

defineProps<{
  imageList: Image[] | undefined;
  headerText: string;
  isPosters: boolean | undefined;
  title: Movie["title"] | undefined;
  baseUrl: InstanceType<typeof ImageComponent>["baseUrl"];
}>();
</script>

<style lang="scss" module>
.sectionHeader {
  margin-top: var(--dp__24);
}

.container {
  display: flex;
  margin: auto calc(-1 * var(--dp__16));
  padding: var(--dp__8);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding: 0 var(--dp__8);
}

.item {
  padding: var(--dp__8);
  flex-shrink: 0;
  scroll-snap-align: start;
}

.item__imgContainer {
  height: 22rem;
  aspect-ratio: var(--backdrop_aspect_ratio);
  position: relative;
  border-radius: var(--dp__8);
  background-color: var(--colors__placeholder);
  box-shadow: var(--shadow__2dp);
  overflow: hidden;
}

.item__imgContainer_poster {
  aspect-ratio: var(--poster_aspect_ratio);
}
</style>
