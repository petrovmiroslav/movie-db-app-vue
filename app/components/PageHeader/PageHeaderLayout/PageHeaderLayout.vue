<template>
  <header
    ref="headerRef"
    :class="[commonCss.contentContainer, $style.pageHeader]"
  >
    <div
      :class="[commonCss.absoluteCenter, $style.shadow, $props.shadowClassName]"
      :style="shadowStyle"
    />

    <div
      :class="[
        commonCss.absoluteCenter,
        $style.background,
        $props.backgroundClassName,
      ]"
      :style="backgroundStyle"
    />

    <slot />
  </header>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue";
import { commonCss } from "~/utils/styles/styles";
import { useWindowSize } from "~/composables/WindowSizeProvider/useWindowSize";
import { useHeaderHeight } from "~/components/PageHeader/HeaderHeightProvider/useHeaderHeight";

defineProps<{
  shadowClassName?: string;
  backgroundClassName?: string;
  shadowStyle?: CSSProperties;
  backgroundStyle?: CSSProperties;
}>();

const windowSize = useWindowSize();
const headerHeight = useHeaderHeight();

const headerRef = useTemplateRef<HTMLElement>("headerRef");

const updateHeaderHeight = () => {
  headerHeight.setHeaderHeight(headerRef.value?.offsetHeight ?? 0);
};

watch(() => windowSize.value.innerWidth, updateHeaderHeight);

onMounted(updateHeaderHeight);
</script>

<style lang="scss" module>
.pageHeader {
  display: flex;
  min-height: var(--pageHeaderMinHeight);
  padding-top: var(--dp__8);
  padding-bottom: var(--dp__8);
  position: fixed;
  top: 0;
  align-items: center;
  z-index: 1;
}

.shadow {
  box-shadow: var(--shadow__8dp);
  z-index: -1;
}

.background {
  background-color: var(--colors__background_light);
  z-index: -1;
}
</style>
