<template>
  <PageHeaderLayout :shadowStyle="shadowStyle">
    <TextInput
      ref="searchInput"
      v-model="searchValue"
      placeholder="Search"
      @focus="expandClearButton"
      @blur="collapseClearButton"
    >
      <template #iconLeft
        ><MaskedIcon :class="$style.icon" :src="Icons.Search"
      /></template>
    </TextInput>
    <button
      ref="searchClearButton"
      :class="[
        commonCss.interactive,
        $style.clearButton,
        isClearButtonExpanded && $style.clearButton__expanded,
      ]"
      @click="onSearchClearClickHandler"
      @focus="expandClearButton"
      @blur="collapseClearButton"
    >
      <span :class="$style.clearButton__text">clear</span>
    </button>
  </PageHeaderLayout>
</template>

<script setup lang="ts">
import { useHeaderHeight } from "~/components/PageHeader/HeaderHeightProvider/useHeaderHeight";
import { createInterpolation } from "~/utils/interpolate/interpolate";
import { roundTo } from "#shared/utils/numbers/numbers";
import { throttle } from "~/utils/functions/functions";
import PageHeaderLayout from "~/components/PageHeader/PageHeaderLayout/PageHeaderLayout.vue";
import TextInput from "~/components/ui/inputs/TextInput.vue";
import { Icons } from "~/components/ui/icons/Icons";
import MaskedIcon from "~/components/ui/icons/MaskedIcon/MaskedIcon.vue";
import { commonCss } from "~/utils/styles/styles";

const route = useRoute();
const router = useRouter();

const headerHeight = useHeaderHeight();

const shadowStyle = shallowRef({ opacity: 0 });

const interpolation = computed(() =>
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

const searchValue = computed({
  get() {
    return route.query.q ?? "";
  },
  set(value) {
    router.replace({
      query: {
        ...route.query,
        q: value || undefined,
      },
    });
  },
});

const isClearButtonExpanded = ref(false);

const expandClearButton = () => {
  isClearButtonExpanded.value = true;
};

const collapseClearButton = () => {
  isClearButtonExpanded.value = false;
};

const searchInput = useTemplateRef("searchInput");
const searchClearButton = useTemplateRef<HTMLElement>("searchClearButton");

const onSearchClearClickHandler = computed(() => () => {
  searchClearButton.value?.blur();
  searchValue.value = "";
  collapseClearButton();
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

onMounted(() => {
  searchInput.value?.inputRef?.focus();
});
</script>

<style lang="scss" module>
.backButton_insideHeaderTransparent {
  color: var(--colors__background_light);
}

.icon {
  width: var(--dp__24);
  height: var(--dp__24);
  color: var(--colors__font_light);
}

.clearButton {
  max-width: 0;
  flex-shrink: 0;
  position: relative;
  border-radius: var(--dp__8);
  white-space: nowrap;
  overflow: hidden;
  opacity: 0;
  transition:
    max-width 0.15s ease-in-out,
    opacity 0.05s ease-in-out;
}

.clearButton__expanded {
  max-width: 30%;
  opacity: 1;
}

.clearButton__text {
  display: block;
  padding: var(--dp__8);
}
</style>
