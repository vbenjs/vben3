<script lang="ts" setup name="VbenLayoutHeader">
import { maps } from '#/index'

const LayoutHeader = maps.get('LayoutHeader')
</script>
<template>
  <LayoutHeader v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></LayoutHeader>
</template>

<style scoped></style>
