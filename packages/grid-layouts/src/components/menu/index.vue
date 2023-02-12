<script lang="ts" setup>
import SubMenu from './SubMenu.vue'
defineProps({
  exclHeight: {
    type: Number,
    default: 0
  }
})

</script>
<template>
  <VbenScrollbar>
    <SubMenu />
  </VbenScrollbar>
</template>
<style lang="scss" scoped></style>
