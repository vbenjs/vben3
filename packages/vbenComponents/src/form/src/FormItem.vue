<script lang="ts" setup name="VbenFormItem">
import { maps } from '#/index'
const FormItem = maps.get('FormItem')
</script>
<template>
  <FormItem v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></FormItem>
</template>

<style scoped></style>
