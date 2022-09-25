<script lang="ts" setup name="VbenFormItemGi">
import { maps } from '#/index'
const FormItemGi = maps.get('FormItemGi')
</script>
<template>
  <FormItemGi v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></FormItemGi>
</template>

<style scoped></style>
