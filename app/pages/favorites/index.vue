<template>
  <div :class="$style.container">
    <PageHeader>Favorites</PageHeader>
    <Results />
  </div>
</template>

<script setup lang="ts">
import Results from "~/sections/Favorites/Results/Results.vue";

definePageMeta({
  layout: "page-layout",
});
</script>

<style lang="scss" module>
.container {
  padding-top: var(--pageHeaderMinHeight);
  padding-bottom: var(--tabBarMinHeight);
}
</style>
