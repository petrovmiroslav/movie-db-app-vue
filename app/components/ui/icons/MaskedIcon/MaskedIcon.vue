<template>
  <i
    :class="$style.icon"
    :style="{ 'mask-image': `url(&quot;${src}&quot;)` }"
  />
</template>

<script setup lang="ts">
defineProps<{ src: string }>();
</script>

<style module lang="scss">
.icon {
  display: inline-block;
  flex-shrink: 0;
  width: 2.4rem;
  height: 2.4rem;
  background: currentColor;
  mask-mode: alpha;
  mask-repeat: no-repeat;
  mask-position: center center;
  mask-clip: border-box;
  mask-origin: border-box;
  mask-size: contain;
}
</style>
