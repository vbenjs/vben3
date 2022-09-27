<script lang="ts" setup name="VbenTreeSelect">
import { maps } from '#/index'
import { onMounted, watch, ref, watchEffect } from 'vue'
import { fetchProps, fetch } from '#/fetch'
import { omit } from '@vben/utils'

const TreeSelect = maps.get('TreeSelect')
const props = defineProps(omit(fetchProps, 'value'))
const isFirstLoad = ref(true)
const options = ref([])
onMounted(() => {})
watchEffect(() => {
  props.immediate && fetch(props, options)
})
watch(
  () => props.params,
  () => {
    !isFirstLoad.value && fetch(props, options)
  },
  { deep: true },
)
</script>
<template>
  <TreeSelect v-bind="$attrs" :options="options">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></TreeSelect>
</template>

<style scoped></style>
