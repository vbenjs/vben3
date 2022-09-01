<script lang="ts" setup name="VbenSelect">
import { maps } from '../../index'
import { Props } from './type'
import { onMounted, watch, ref, watchEffect } from 'vue'
import { isFunction } from '@vben/utils'
const Select = maps.get('Select')
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
  <Select v-bind="$attrs" :options="options">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Select>
</template>

<style scoped></style>
