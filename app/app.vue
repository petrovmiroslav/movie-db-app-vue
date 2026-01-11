<script setup lang="ts">
import { VApp } from "vuetify/components";
import "~/assets/styles/index.scss";
import ConfigurationProvider from "~/features/configuration/components/ConfigurationProvider/ConfigurationProvider.vue";
import GenresDictProvider from "~/features/genres/components/GenresDictProvider/GenresDictProvider.vue";
import FavoritesDictProvider from "~/features/favorites/components/FavoritesDictProvider/FavoritesDictProvider.vue";
import WindowSizeProvider from "~/composables/WindowSizeProvider/WindowSizeProvider.vue";
import HeaderHeightProvider from "~/components/PageHeader/HeaderHeightProvider/HeaderHeightProvider.vue";

const title = "The Movie Database (TMDB)";
const description =
  "The Movie Database (TMDB) is a popular, user editable database for movies and TV shows.";

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
});
</script>

<template>
  <VApp>
    <ConfigurationProvider>
      <FavoritesDictProvider>
        <GenresDictProvider>
          <WindowSizeProvider>
            <HeaderHeightProvider>
              <NuxtLayout>
                <NuxtPage />
              </NuxtLayout>
            </HeaderHeightProvider>
          </WindowSizeProvider>
        </GenresDictProvider>
      </FavoritesDictProvider>
    </ConfigurationProvider>
  </VApp>
</template>
