<script lang="ts" setup name="VbenPopSelect">
import { maps } from '#/index'
import { fetchProps, fetch } from '#/fetch'
import { watch, ref, watchEffect } from 'vue'
import { omit } from '@vben/utils'
const PopSelect = maps.get('PopSelect')

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
  <PopSelect v-bind="$attrs" :options="options">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot></template
  ></PopSelect>
</template>

<style scoped></style>
