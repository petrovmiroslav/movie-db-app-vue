<template>
  <nav :class="[commonCss.contentContainer, $style.pageTabBar]">
    <ul :class="$style.list">
      <li
        v-for="tabData in tabDataList"
        :key="tabData.path"
        :class="$style.itemContainer"
      >
        <Link
          :class="$style.item"
          :exactActiveClass="$style.item_selected"
          :to="tabData.path"
        >
          <MaskedIcon :src="tabData.icon" :class="$style.icon" />
          {{ tabData.title }}
        </Link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { commonCss } from "~/utils/styles/styles";
import { Icons } from "~/components/ui/icons/Icons";
import { APP_PATHS } from "~/utils/navigation/constants";
import MaskedIcon from "~/components/ui/icons/MaskedIcon/MaskedIcon.vue";
import Link from "~/components/ui/links/Link/Link.vue";

const tabDataList = [
  {
    title: "main",
    icon: Icons.MainFilled,
    path: APP_PATHS.main(),
  },
  {
    title: "search",
    icon: Icons.Search,
    path: APP_PATHS.search(),
  },
  {
    title: "favorites",
    icon: Icons.FavoritesFilled,
    path: APP_PATHS.favorites(),
  },
] as const;
</script>

<style lang="scss" module>
.pageTabBar {
  min-height: var(--tabBarMinHeight);
  padding-top: var(--dp__8);
  padding-bottom: var(--dp__8);
  position: fixed;
  bottom: 0;
  background-color: var(--colors__background_light);
  box-shadow: var(--shadow__8dp);
  z-index: 1;
}

.list {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
}

.itemContainer {
  display: block;
  flex: 1 1 100%;
}

.item {
  display: block;
  padding: var(--dp__8);
  border-radius: var(--dp__8);
  font: var(--fonts__s);
  color: var(--colors__background_very_dark);
  text-align: center;

  &_selected {
    color: var(--colors__primary);
  }
}

.icon {
  display: block;
  width: var(--dp__24);
  height: var(--dp__24);
  margin: 0 auto var(--dp__4);
}
</style>
