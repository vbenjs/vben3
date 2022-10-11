<script lang="ts" setup>
defineProps({
  icon: String,
})
</script>

<template>
  <span :class="$attrs.class">
    <VbenIconify :icon="icon" />
  </span>
</template>
