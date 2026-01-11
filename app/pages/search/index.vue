<template>
  <div :class="$style.container">
    <Header />
    <Results />
  </div>
</template>

<script setup lang="ts">
import Header from "~/sections/Search/Header/Header.vue";
import Results from "~/sections/Search/Results/Results.vue";

definePageMeta({
  layout: "page-layout",
});
</script>

<style lang="scss" module>
.container {
  padding-top: var(--dp__72);
  padding-bottom: var(--tabBarMinHeight);
}
</style>
