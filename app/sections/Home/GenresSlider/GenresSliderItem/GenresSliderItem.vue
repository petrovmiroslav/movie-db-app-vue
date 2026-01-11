<template>
  <Link
    :class="[commonCss.interactive, $style.item]"
    :to="{ path: APP_PATHS.discover(), query: { with_genres: $props.id } }"
  >
    <span :class="$style.text">{{ $props.name }}</span>
  </Link>
</template>

<script setup lang="ts">
import { commonCss } from "~/utils/styles/styles";
import { APP_PATHS } from "~/utils/navigation/constants";
import type { Genre } from "~/features/genres/types";
import Link from "~/components/ui/links/Link/Link.vue";

defineProps<Genre>();
</script>

<style lang="scss" module>
.item {
  padding: var(--dp__8);
  flex-shrink: 0;
  border-radius: var(--dp__8);
  scroll-snap-align: start;
}

.text {
  display: inline-block;
  padding: var(--dp__16);
  border-radius: var(--dp__8);
  box-shadow: var(--shadow__2dp);
  background-color: var(--colors__background_dark);
  font: var(--fonts__m);
  color: var(--colors__font_dark);
}
</style>
