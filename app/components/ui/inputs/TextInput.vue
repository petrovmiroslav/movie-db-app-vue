<template>
  <div :class="$style.wrapper">
    <input
      ref="inputRef"
      :class="[$style.input, $slots.iconLeft && $style.input_withLeftIcon]"
      v-bind="$attrs"
      v-model="model"
    />
    <span
      v-if="$slots.iconLeft"
      :class="[$style.iconContainer, $style.iconContainer_left]"
      ><slot name="iconLeft"
    /></span>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const model = defineModel();

const inputRef = useTemplateRef<HTMLInputElement>("inputRef");

defineExpose({ inputRef });
</script>

<style lang="scss" module>
.wrapper {
  width: 100%;
  position: relative;
}

.input {
  display: block;
  appearance: none;
  width: 100%;
  margin: 0;
  padding: var(--dp__16);
  border-radius: var(--dp__4);
  background-color: var(--colors__background_medium);
  outline: none;
  box-shadow: none;
  font: var(--fonts__m);
  color: inherit;

  &::placeholder {
    color: var(--colors__font_light);
    opacity: 1;
  }
}

.input_withLeftIcon {
  padding-left: var(--dp__48);
}

.iconContainer {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  align-items: center;
  color: inherit;
  pointer-events: none;
  user-select: none;
}

.iconContainer_left {
  left: var(--dp__16);
}
</style>
