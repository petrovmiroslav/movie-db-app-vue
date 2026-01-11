<template>
  <PageHeaderLayout
    :shadowStyle="hiddenElementStyle"
    :backgroundStyle="hiddenElementStyle"
  >
    <BackButton
      :class="[
        hiddenElementsOpacity < 0.5 &&
          $style.backButton_insideHeaderTransparent,
      ]"
    />

    <ScreenHeaderTitle :class="$style.title" :style="hiddenElementStyle">
      <slot />
    </ScreenHeaderTitle>
  </PageHeaderLayout>
</template>

<script lang="ts" setup>
import { useHeaderHeight } from "~/components/PageHeader/HeaderHeightProvider/useHeaderHeight";
import { createInterpolation } from "~/utils/interpolate/interpolate";
import PageHeaderLayout from "~/components/PageHeader/PageHeaderLayout/PageHeaderLayout.vue";
import BackButton from "~/components/ui/buttons/BackButton/BackButton.vue";

const props = defineProps<{
  scrollY: number;
  heroImageVisibleHeight: number;
}>();

const headerHeight = useHeaderHeight();

const interpolation = computed(() =>
  createInterpolation({
    inputRange: [
      props.heroImageVisibleHeight - headerHeight.headerHeight - 10,
      props.heroImageVisibleHeight - headerHeight.headerHeight,
    ],
    outputRange: [0, 1],
    extrapolate: "clamp",
  }),
);

const hiddenElementsOpacity = computed(() =>
  props.heroImageVisibleHeight ? interpolation.value(props.scrollY) : 0,
);

const hiddenElementStyle = computed(() => ({
  opacity: hiddenElementsOpacity.value,
}));
</script>

<style lang="scss" module>
.backButton_insideHeaderTransparent {
  color: var(--colors__background_light);
}

.title {
  padding-right: 2.4rem;
}
</style>
