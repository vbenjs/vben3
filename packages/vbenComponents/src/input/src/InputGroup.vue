<script lang="ts" setup name="VbenInputGroup">
import { maps } from '#/index'
const InputGroup = maps.get('InputGroup')
</script>
<template>
  <InputGroup v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></InputGroup>
</template>

<style scoped></style>
