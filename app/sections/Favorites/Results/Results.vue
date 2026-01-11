<template>
  <section :class="[commonCss.contentContainer, $style.container]">
    <ResultItem
      v-for="favorite in favoritesQuery.data.value"
      :key="favorite.id"
      :class="$style.item"
      :entityId="favorite.entityId"
      :date="favorite.date"
    />
  </section>
</template>

<script lang="ts" setup>
import { commonCss } from "~/utils/styles/styles";
import { useFavoritesQuery } from "~/features/favorites/queries";
import ResultItem from "~/sections/Favorites/Results/ResultItem/ResultItem.vue";

const favoritesQuery = useFavoritesQuery();
</script>

<style lang="scss" module>
.container {
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
}

.item {
  margin-bottom: var(--dp__8);
}
</style>
