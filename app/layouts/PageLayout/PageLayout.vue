<template>
  <div :class="[commonCss.contentContainer, $style.container]">
    <PageTabBar />

    <main :class="$style.main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { commonCss } from "~/utils/styles/styles";
import PageTabBar from "~/components/PageTabBar/PageTabBar.vue";
</script>

<style lang="scss" module>
@import "../../assets/styles/shared.module";

.container {
  display: flex;
  padding: 0;
  flex-grow: 1;
  flex-direction: column;

  @include media-breakpoint-up(md) {
    box-shadow: var(--shadow__16dp);
  }
}

.main {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}
</style>
