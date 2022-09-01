<script lang="ts" setup>
import { VbenIconify } from '@vben/vbencomponents/iconify'
defineProps({
  icon: String,
})
</script>

<template>
  <span :class="$attrs.class">
    <VbenIconify :icon="icon" />
  </span>
</template>
