<template>
  <div :class="$style.container">
    <PageHeader :withBackButton="true">Discover</PageHeader>
    <Results />
  </div>
</template>

<script setup lang="ts">
import Results from "~/sections/Discover/Results/Results.vue";

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
