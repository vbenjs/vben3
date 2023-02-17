<script lang="ts" setup>
import SecondaryBorder from './SecondaryBorder.vue'
</script>
<template>
  <div
    class="h-full w-36px grid-center cursor-pointer relative color-blue-gray-400 hover:color-blue-gray-800 dark:hover:color-blue-gray-50"
  >
    <slot></slot>
    <SecondaryBorder left />
  </div>
</template>
