<template>
  <h1 :class="[commonCss.ellipsis, $style.title]">
    <slot />
  </h1>
</template>

<script setup lang="ts">
import { commonCss } from "~/utils/styles/styles";
</script>

<style lang="scss" module>
.title {
  flex: 1;
  font: var(--fonts__header_s);
  text-align: center;
}
</style>
