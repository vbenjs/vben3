<script lang="ts" setup>
import SecondaryBorder from '../comm/SecondaryBorder.vue'
</script>
<template>
  <div class="h-full w-36px grid-center cursor-pointer relative">
    <slot></slot>
    <SecondaryBorder left />
  </div>
</template>
