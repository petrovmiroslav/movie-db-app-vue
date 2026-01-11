<template>
  <VBtn
    :class="[commonCss.interactive, $style.button, $style.button_default]"
    type="button"
    variant="plain"
    ><slot
  /></VBtn>
</template>

<style module lang="scss">
.button {
  min-width: auto;
  padding: 0;
  font: var(--fonts__m);
  opacity: 1;
  text-transform: none;
  transition: none;

  &.button_default {
    height: auto;
  }
}
</style>

<script setup lang="ts">
import { VBtn } from "vuetify/components/VBtn";
import { commonCss } from "~/utils/styles/styles";
</script>
