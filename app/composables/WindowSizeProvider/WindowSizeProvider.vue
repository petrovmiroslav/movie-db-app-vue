<template><slot /></template>

<script setup lang="ts">
import { debounce } from "~/utils/functions/functions";
import { provideWindowSize } from "~/composables/WindowSizeProvider/useWindowSize";

const getWindowSize = () => {
  if (typeof window === "undefined")
    return {
      innerWidth: 0,
      innerHeight: 0,
    };
  return { innerWidth: window.innerWidth, innerHeight: window.innerHeight };
};

const windowSize = shallowRef(getWindowSize());

const listener = debounce(() => {
  windowSize.value = getWindowSize();
}, 16);

onMounted(() => {
  listener();
  window.addEventListener("resize", listener);
});

onUnmounted(() => {
  window.removeEventListener("resize", listener);
});

provideWindowSize(windowSize);
</script>
