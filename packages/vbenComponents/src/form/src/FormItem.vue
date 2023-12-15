<script lang="ts" setup>
import { useAttrs } from 'vue'

defineOptions({ name: 'VbenFormItem' })
import { maps } from '../../index'
const FormItem = maps.get('FormItem')
const attr = useAttrs()
</script>
<template>
  <FormItem
    v-bind="$attrs"
    :hide-label="!attr['show-label']"
    :show-label="!attr['hide-label']"
  >
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></FormItem>
</template>

<style scoped></style>
