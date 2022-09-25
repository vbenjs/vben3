<script lang="ts" setup name="VbenCheckbox">
import { maps } from '#/index'
const Checkbox = maps.get('Checkbox')
</script>
<template>
  <Checkbox v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Checkbox>
</template>

<style scoped></style>
