<template>
  <div ref="imageContainer" :class="$style.container">
    <img :class="$style.img" :src="link" :alt="alt" />
  </div>
</template>

<script setup lang="ts">
import type { ConfigurationImages } from "~/features/configuration/types";
import { getImageUrl } from "~/features/images/utils/utils";

const props = defineProps<{
  src: string;
  baseUrl: ConfigurationImages["secureBaseUrl"];
  alt: string | undefined;
}>();

const link = computed(() =>
  getImageUrl({
    baseUrl: props.baseUrl,
    size: undefined,
    filePath: props.src,
  }),
);

const imageContainer = useTemplateRef<HTMLElement>("imageContainer");

defineExpose({ imageContainer });
</script>

<style lang="scss" module>
.container {
  position: relative;
  background-color: var(--colors__placeholder);
  overflow: hidden;
}
.img {
  object-fit: cover;
  object-position: center;

  position: absolute;
  height: 100%;
  width: 100%;
  inset: 0;
  color: transparent;
}
</style>
