import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import * as path from "path";
import crypto from "crypto";
import { type ViteOptions } from "nuxt/schema";
import { type CSSModulesOptions } from "vite";

const generateScopedName: CSSModulesOptions["generateScopedName"] = (
  className,
  filePath,
) => {
  const fileName = path.basename(filePath, ".vue");
  const componentName = fileName
    .substring(0, fileName.indexOf(".vue"))
    .replaceAll(/[^a-zA-Z0-9]/g, "");

  const hash = crypto
    .createHash("sha256")
    .update(filePath)
    .digest("hex")
    .substring(0, 5);

  return `${componentName}__${className}__${hash}`;
};

const css = {
  modules: {
    generateScopedName,
  },
} satisfies ViteOptions["css"];

const vite = {
  plugins: [vuetify({ autoImport: false })],
  vue: {
    template: {
      transformAssetUrls,
    },
  },
  css,
} satisfies ViteOptions;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: "build",
  },
  build: {
    transpile: ["vuetify"],
  },
  vite,
});
