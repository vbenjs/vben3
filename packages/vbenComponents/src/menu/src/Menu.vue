<script lang="ts" setup name="VbenMenu">
import { maps } from '#/index'
import { ref } from 'vue'
const Menu = maps.get('Menu')
const Ref = ref(null)
defineExpose({ Ref })
</script>
<template>
  <Menu v-bind="$attrs" ref="Ref">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Menu>
</template>

<style scoped></style>
