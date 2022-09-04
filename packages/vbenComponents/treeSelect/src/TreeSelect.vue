<script lang="ts" setup name="VbenTreeSelect">
import { maps } from '../../index'
import { Props } from './type'
import { onMounted, watch, ref, watchEffect } from 'vue'
import { isFunction } from '@vben/utils'
const TreeSelect = maps.get('TreeSelect')
const props: Props = defineProps({
  api: {
    type: Function,
    default: null,
  },
  params: {
    type: Object,
    default: () => ({}),
  },
  immediate: {
    type: Boolean,
    default: true,
  },
})
const isFirstLoad = ref(true)
onMounted(() => {})
watchEffect(() => {
  props.immediate && fetch()
})
watch(
  () => props.params,
  () => {
    !isFirstLoad.value && fetch()
  },
  { deep: true },
)
async function fetch() {
  const { api, params } = props
  if (!api || !isFunction(api)) return
  const res = await api(params)
  options.value = res.options
}
const options = ref([])
</script>
<template>
  <TreeSelect v-bind="$attrs" :options="options">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></TreeSelect>
</template>

<style scoped></style>
