<template>
  <NuxtLink :class="[commonCss.interactive, $style.link]" v-bind="props"
    ><slot
  /></NuxtLink>
</template>

<script setup lang="ts">
import type { NuxtLink } from "#components";
import { commonCss } from "~/utils/styles/styles";

type NuxtLinkProps = InstanceType<typeof NuxtLink>["$props"];
interface Props extends /* @vue-ignore */ NuxtLinkProps {}
const props = defineProps<Props>();
</script>

<style lang="scss" module>
.link {
  color: inherit;
}
</style>
