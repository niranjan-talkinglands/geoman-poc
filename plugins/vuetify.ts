import '~/assets/css/main.scss';
import { mdi } from 'vuetify/iconsets/mdi-svg';
import { createVuetify } from 'vuetify';
import { defineNuxtPlugin } from '#app';
import { customAliases } from '~/utils/config/vuetify-icons';
import { colors } from '~/utils/config/theme';

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    ssr: true,
    icons: {
      defaultSet: 'mdi',
      aliases: customAliases,
      sets: {
        mdi
      }
    },
    theme: {
      themes: {
        light: {
          dark: false,
          colors
        }
      }
    }
  });
  app.vueApp.use(vuetify);
});
