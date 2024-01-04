<script lang="ts" setup>
import { Layout } from '@vben/layouts'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import LayoutFeatures from './feature/index.vue'
const frame = computed(() => useRoute().meta.frame)
</script>

<template>
  <LayoutFeatures />
  <layout>
    <template #main>
      <RouterView v-if="!frame" />
      <iframe v-else v-bind="frame" />
    </template>
  </layout>
</template>
