<script lang="ts" setup name="VbenTabs">
import { maps } from '#/index'

const Tabs = maps.get('Tabs')
</script>
<template>
  <Tabs v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Tabs>
</template>

<style scoped></style>
