<script setup lang="ts">
import { computed } from 'vue'

const getIcon = computed(() =>
  true ? 'codicon:screen-full' : 'codicon:screen-normal',
)
</script>

<template>
  <div
    class="h-full w-36px grid-center border-l border-l-solid border-[var(--layout-border-color)] cursor-pointer"
  >
    <VbenIconify :icon="getIcon" />
  </div>
</template>
