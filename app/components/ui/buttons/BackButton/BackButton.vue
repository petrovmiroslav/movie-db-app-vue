<template>
  <Button :class="$style.button" aria-label="go back" @click="$router.back"
    ><MaskedIcon :class="$style.icon" :src="Icons.ArrowLeft"
  /></Button>
</template>

<script setup lang="ts">
import Button from "~/components/ui/buttons/Button/Button.vue";
import { Icons } from "~/components/ui/icons/Icons";
import MaskedIcon from "~/components/ui/icons/MaskedIcon/MaskedIcon.vue";
</script>

<style lang="scss" module>
.button {
  display: block;
  margin-left: calc(-1 * var(--dp__16));
  padding: var(--dp__8) var(--dp__16);
  border-radius: var(--dp__8);
  color: var(--colors__background_dark);
}

.icon {
  display: block;
  width: var(--dp__8);
  height: var(--dp__16);
}
</style>
