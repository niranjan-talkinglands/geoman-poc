<template>
  <div
    class="py-4 px-4 md:px-10 flex justify-between items-center gap-4 shrink-0 z-[12] bg-white shadow-lg"
  >
    <BaseImage
      :src="getAssetsURL(DESKTOP_LOGO)"
      height="80"
      width="200"
      alt="logo"
      class="hidden md:block shrink-0"
    />
    <BaseImage
      :src="getAssetsURL(MOBILE_LOGO)"
      height="30"
      width="30"
      alt="logo"
      class="block md:hidden shrink-0"
    />
  </div>
</template>

<script lang="ts" setup>
import { DESKTOP_LOGO, MOBILE_LOGO } from '~/utils/constants/url';
import { getAssetsURL } from '~/utils/helpers';
</script>
