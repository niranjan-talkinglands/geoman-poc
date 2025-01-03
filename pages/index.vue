<template>
  <BaseMap />
</template>

<script setup lang="ts">
import { APP_NAME } from '~/utils/constants';

onMounted(() => {
  //@ts-ignore
  window.ReactNativeWebView.postMessage('Message from web', '*');
});

definePageMeta({
  layout: 'app'
});

useHead({
  title: APP_NAME
});
</script>
