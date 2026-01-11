<template>
  <Link :class="$style.card" :to="link">
    <Poster
      :class="$style.poster"
      :baseUrl="baseUrl"
      :title="title"
      :posterPath="posterPath"
    />
    <div :class="$style.content"><slot /></div>
    <MaskedIcon :class="$style.icon" :src="Icons.ArrowLeft" />
  </Link>
</template>

<script setup lang="ts">
import MaskedIcon from "~/components/ui/icons/MaskedIcon/MaskedIcon.vue";
import { APP_PATHS } from "~/utils/navigation/constants";
import Link from "~/components/ui/links/Link/Link.vue";
import { Icons } from "~/components/ui/icons/Icons";
import type { Movie } from "~/features/movies/types";
import Poster from "~/features/movies/components/Poster/Poster.vue";

const props = defineProps<{
  id: Movie["id"];
  title: Movie["title"] | undefined;
  baseUrl: InstanceType<typeof Poster>["baseUrl"];
  posterPath: InstanceType<typeof Poster>["posterPath"];
}>();

const link = computed(() => APP_PATHS.movie(props.id));
</script>

<style lang="scss" module>
.card {
  display: flex;
  padding: var(--dp__8);
  border-radius: var(--dp__8);
  background-color: var(--colors__background_light);
  box-shadow: var(--shadow__2dp);
  color: var(--colors__font_dark);
}

.poster {
  min-width: 7rem;
}

.content {
  min-width: 0;
  margin-left: var(--dp__8);
  padding: var(--dp__8) 0;
  flex: 1;
}

.icon {
  width: var(--dp__8);
  margin: 0 var(--dp__8);
  transform: rotate(180deg);
  color: var(--colors__background_dark);
}
</style>
