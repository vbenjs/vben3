<script lang="ts" setup name="VbenDropdown">
import { maps } from '#/index'
const Dropdown = maps.get('Dropdown')
</script>
<template>
  <Dropdown v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Dropdown>
</template>

<style scoped></style>
