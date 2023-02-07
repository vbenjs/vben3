<script setup lang="ts">
import { computed } from 'vue'
import SuffixItemWrapper from './SuffixItemWrapper.vue'

const getIcon = computed(() =>
  true ? 'codicon:screen-full' : 'codicon:screen-normal',
)
</script>

<template>
  <SuffixItemWrapper>
    <VbenIconify :icon="getIcon" />
  </SuffixItemWrapper>
</template>
