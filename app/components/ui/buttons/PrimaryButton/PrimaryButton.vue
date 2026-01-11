<template>
  <Button :class="$style.button"><slot /></Button>
</template>
<style module lang="scss">
.button {
  --focus-visible-outline-color: var(--colors__background_very_dark);

  display: flex;
  padding: var(--dp__12) var(--dp__24);
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  border-radius: var(--dp__8);
  background-color: var(--colors__primary);
  color: var(--colors__background_light);
  box-shadow: var(--shadow__2dp);
}
</style>

<script setup lang="ts">
import Button from "~/components/ui/buttons/Button/Button.vue";
</script>
