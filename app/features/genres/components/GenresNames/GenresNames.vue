<template>
  <p v-if="genreNameList" :class="[commonCss.ellipsis, $style.list]">
    {{ genreNameList }}
  </p>
</template>

<script lang="ts" setup>
import type { Genre, GenreId } from "~/features/genres/types";
import { useGenresDict } from "~/features/genres/components/GenresDictProvider/useGenresDict";
import { commonCss } from "~/utils/styles/styles";

const props = defineProps<{
  genreList: Genre[] | undefined;
  genreIdList: GenreId[] | undefined;
}>();

const genresDict = useGenresDict();

const genreNameList = computed(() => {
  const list = props.genreList?.length
    ? props.genreList?.map((genre) => genre.name)
    : props.genreIdList?.map((genreId) => genresDict?.value?.[genreId]?.name);

  return (
    list
      ?.filter((maybeString): maybeString is string => Boolean(maybeString))
      .join(", ") ?? ""
  );
});
</script>

<style lang="scss" module>
.list {
  color: var(--colors__font_light);
}
</style>
