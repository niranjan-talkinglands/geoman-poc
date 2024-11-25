// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import ViteComponents from 'unplugin-vue-components/vite';
import IconsResolver from 'unplugin-icons/resolver';

export default defineNuxtConfig({
  css: ['~/assets/css/main.scss'],

  modules: [
    'nuxt-svgo',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify({ autoImport: true }));
      });
    },
    '@nuxtjs/google-fonts',
    'unplugin-icons/nuxt',
    '@nuxt/eslint',
    '@nuxt/image',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/sitemap',
    '@vueuse/motion/nuxt'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  build: {
    transpile: ['vuetify']
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    },
    plugins: [
      ViteComponents({
        resolvers: [
          IconsResolver({
            prefix: '',
            strict: true
          })
        ],
        dts: true
      })
    ]
  },

  svgo: {
    autoImportPath: '~/assets/icons/'
  },

  googleFonts: {
    families: {
      Quicksand: '300..700'
    }
  },

  compatibilityDate: '2024-07-16',

  devServer: {
    port: 3005
  },

  typescript: {
    strict: true
  }
});
