<script lang="ts" setup name="VbenLayoutContent">
import { maps } from '#/index'

const LayoutContent = maps.get('LayoutContent')
</script>
<template>
  <LayoutContent v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></LayoutContent>
</template>

<style scoped></style>
