<template>
  <div>
    <v-img
      v-if="from === 'vuetify'"
      v-bind="attrs"
      :cover="fit === 'cover'"
      :src="imgSrc"
      :lazy-src="imgSrc"
      :height="height"
      :width="width"
      :alt="alt"
      class="h-full w-full"
      @error="handleError"
    />
    <v-parallax
      v-else-if="from === 'parallax'"
      :src="imgSrc"
      :height="height"
      :width="width"
      :alt="alt"
      :rounded="rounded"
      @error="handleError"
    />
    <NuxtImg
      v-else
      :src="imgSrc"
      :lazy-src="imgSrc"
      :height="height"
      :width="width"
      :alt="alt"
      :fit="fit"
      @error="handleError"
    />
  </div>
</template>

<script setup lang="ts">
import { ERROR_IMAGE } from '~/utils/constants/url';

interface IImageProps {
  src: string;
  alt: string;
  from?: 'vuetify' | 'parallax' | 'nuxt';
  height?: string | number;
  width?: string | number;
  rounded?: string;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

const props = withDefaults(defineProps<IImageProps>(), {
  from: 'nuxt',
  height: undefined,
  width: undefined,
  rounded: undefined,
  fit: 'contain'
});
const { from, src, fit, height, width, rounded, alt } = toRefs(props);

const imgSrc = computed(() => src.value);

const handleError = () => {
  src.value = ERROR_IMAGE;
};

const attrs = useAttrs();
</script>
