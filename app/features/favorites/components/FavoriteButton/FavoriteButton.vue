<template>
  <Button
    :class="$style.button"
    @click="onClick"
    :disabled="
      addToFavoritesMutation.isPending.value ||
      removeFromFavoritesMutation.isPending.value
    "
    :ariaLabel="isFavorite ? 'remove from favorites' : 'add to favorites'"
  >
    <MaskedIcon
      :class="[
        commonCss.absoluteCenter,
        $style.icon,
        isFavorite && $style.icon_hidden,
      ]"
      :src="Icons.FavoritesOutlined"
    />
    <MaskedIcon
      :class="[
        commonCss.absoluteCenter,
        $style.icon,
        !isFavorite && $style.icon_hidden,
      ]"
      :src="Icons.FavoritesFilled"
    />
  </Button>
</template>

<script setup lang="ts">
import { commonCss } from "~/utils/styles/styles";
import { Icons } from "~/components/ui/icons/Icons";
import MaskedIcon from "~/components/ui/icons/MaskedIcon/MaskedIcon.vue";
import Button from "~/components/ui/buttons/Button/Button.vue";
import type { MovieId } from "~/features/movies/types";
import { FavoritesTypes } from "~/features/favorites/types";
import { useFavoritesDict } from "~/features/favorites/components/FavoritesDictProvider/useFavoritesDict";
import {
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
} from "~/features/favorites/queries";

const props = defineProps<{ movieId: MovieId }>();

const favoritesDict = useFavoritesDict();

const favoriteId = computed(() => favoritesDict?.value?.[props.movieId]?.id);

const isFavorite = computed(() => Boolean(favoriteId.value));

const addToFavoritesMutation = useAddToFavoritesMutation();
const removeFromFavoritesMutation = useRemoveFromFavoritesMutation();

const onClick = () => {
  if (favoriteId.value) {
    return removeFromFavoritesMutation.mutate({ id: favoriteId.value });
  }

  addToFavoritesMutation.mutate({
    type: FavoritesTypes.MOVIE,
    entityId: props.movieId,
  });
};
</script>

<style lang="scss" module>
.button {
  width: var(--dp__32);
  height: var(--dp__32);
  position: relative;
  color: var(--colors__primary);

  &.button {
    height: var(--dp__32);
  }
}

.icon {
  width: 100%;
  height: 100%;

  &_hidden {
    opacity: 0;
  }
}
</style>
