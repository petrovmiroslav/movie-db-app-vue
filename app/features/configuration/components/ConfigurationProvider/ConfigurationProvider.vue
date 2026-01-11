<template>
  <slot />
</template>

<script setup lang="ts">
import { useConfigurationQuery } from "~/features/configuration/queries";
import { provideConfiguration } from "~/features/configuration/components/ConfigurationProvider/useConfiguration";

const configurationQuery = useConfigurationQuery();

provideConfiguration(configurationQuery.data);
</script>
