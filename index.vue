<template>
  <BaseMap />
</template>

<script setup lang="ts">
import { APP_NAME } from '~/utils/constants';

definePageMeta({
  layout: 'app'
});

useHead({
  title: APP_NAME
});
</script>
