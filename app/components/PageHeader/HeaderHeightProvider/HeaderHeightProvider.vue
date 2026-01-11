<template>
  <slot />
</template>

<script setup lang="ts">
import { provideHeaderHeight } from "~/components/PageHeader/HeaderHeightProvider/useHeaderHeight";

const headerHeight = ref(0);

const setHeaderHeight = (newValue: number) => {
  headerHeight.value = newValue;
};

provideHeaderHeight(readonly({ headerHeight, setHeaderHeight }));
</script>
