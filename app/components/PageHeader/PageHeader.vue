<template>
  <PageHeaderLayout :shadowStyle="shadowStyle">
    <BackButton v-if="withBackButton" />

    <ScreenHeaderTitle
      :class="[withBackButton && $style.title_withReservedSpaceOnRight]"
    >
      <slot />
    </ScreenHeaderTitle>
  </PageHeaderLayout>
</template>

<script setup lang="ts">
import { useHeaderHeight } from "~/components/PageHeader/HeaderHeightProvider/useHeaderHeight";
import { createInterpolation } from "~/utils/interpolate/interpolate";
import { roundTo } from "#shared/utils/numbers/numbers";
import { throttle } from "~/utils/functions/functions";
import PageHeaderLayout from "~/components/PageHeader/PageHeaderLayout/PageHeaderLayout.vue";
import BackButton from "~/components/ui/buttons/BackButton/BackButton.vue";
import ScreenHeaderTitle from "~/components/ScreenHeaderTitle/ScreenHeaderTitle.vue";

defineProps<{
  withBackButton?: boolean;
}>();

const headerHeight = useHeaderHeight();

const shadowStyle = shallowRef({ opacity: 0 });

const interpolation = computed(() =>
  // header animation on scroll
  createInterpolation({
    inputRange: [0, headerHeight.headerHeight * 0.5],
    outputRange: [0, 1],
    extrapolate: "clamp",
  }),
);

const scrollHandler = computed(() => () => {
  const { scrollY } = window;
  const opacity = roundTo(interpolation.value(scrollY), 2);

  if (shadowStyle.value.opacity !== opacity) {
    shadowStyle.value = { opacity };
  }
});

watchEffect((onCleanup) => {
  if (import.meta.server) return;

  const listener = throttle(scrollHandler.value, 64);

  window.addEventListener("scroll", listener, { passive: true });

  onCleanup(() => {
    window.removeEventListener("scroll", listener);
  });
});

onMounted(scrollHandler.value);
</script>

<style lang="scss" module>
.title_withReservedSpaceOnRight {
  padding-right: 2.4rem;
}
</style>
