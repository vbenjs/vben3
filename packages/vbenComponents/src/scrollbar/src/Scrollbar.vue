<script lang="ts" setup name="VbenScrollbar">
import { maps } from '#/index'

const Scrollbar = maps.get('Scrollbar')
</script>
<template>
  <Scrollbar v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Scrollbar>
</template>

<style scoped></style>
