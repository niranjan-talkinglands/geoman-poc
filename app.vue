<template>
  <v-app class="!bg-transparent">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>

<script setup lang="ts">
import { CLARITY_ID } from './utils/constants';

useHead({
  script: [
    {
      innerHTML: `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_ID}");`,
      tagPriority: 'low',
      tagPosition: 'bodyClose',
      tagDuplicateStrategy: 'replace'
    }
  ]
});
</script>
