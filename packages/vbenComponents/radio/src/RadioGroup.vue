<script lang="ts" setup name="VbenRadioGroup">
import { maps } from '../../index'
import { Props } from '../../treeSelect/src/type'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { isFunction } from '@vben/utils'
const RadioGroup = maps.get('RadioGroup')
const props: Props = defineProps({
  api: {
    type: Function,
    default: null,
  },
  params: {
    type: Object,
    default: () => ({}),
  },
  options: {
    type: Array,
    default: [],
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
const options = ref(props.options || [])
</script>
<template>
  <!--  {{ $attrs }}-->
  <RadioGroup v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
    <template v-for="item in options" :key="`${item.value}`">
      <VbenRadioButton
        v-if="$attrs.type === 'button'"
        v-model:value="item.value"
        v-bind="item"
        >{{ item.label }}</VbenRadioButton
      >
      <VbenRadio v-else v-model:value="item.value" v-bind="item">{{
        item.label
      }}</VbenRadio>
    </template>
  </RadioGroup>
</template>

<style scoped></style>
