<script lang="ts" setup name="VbenSelect">
import { maps } from '#/index'
import { fetchProps, fetch } from '#/fetch'
import { watch, ref, watchEffect } from 'vue'
import { omit } from '@vben/utils'
const Select = maps.get('Select')

const props = defineProps(omit(fetchProps, ['value']))
const isFirstLoad = ref(true)
const options = ref([])
watchEffect(() => {
  props.immediate && fetch(props, options)
})
watch(
  () => props.params,
  () => {
    options.value = []
    fetch(props, options)
  },
  { deep: true },
)
</script>
<template>
  <Select v-bind="$attrs" :options="options">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot></template
  ></Select>
</template>

<style scoped></style>
