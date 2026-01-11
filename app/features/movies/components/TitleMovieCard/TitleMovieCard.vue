<template>
  <p :class="[commonCss.ellipsisMultiline, $style.title]">
    <slot />
  </p>
</template>

<script setup lang="ts">
import { commonCss } from "~/utils/styles/styles";
</script>

<style lang="scss" module>
.title {
  --linesToShow: 1;
  font: var(--fonts__header_s);
}
</style>
