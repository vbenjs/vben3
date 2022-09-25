<script lang="ts" setup>
import { VbenIconify } from '../../../../../../packages/vbenComponents/src/iconify'
defineProps({
  icon: String,
})
</script>

<template>
  <span :class="$attrs.class">
    <VbenIconify :icon="icon" />
  </span>
</template>
