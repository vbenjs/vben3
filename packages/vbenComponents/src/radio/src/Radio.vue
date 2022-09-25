<script lang="ts" setup name="VbenRadio">
import { maps } from '#/index'
const Radio = maps.get('Radio')
</script>
<template>
  <Radio v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Radio>
</template>

<style scoped></style>
