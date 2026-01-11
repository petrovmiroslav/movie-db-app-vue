<template>
  <h2 :class="$style.header">
    <slot />
  </h2>
</template>

<style module lang="scss">
.header {
  font: var(--fonts__header_m);
}
</style>
