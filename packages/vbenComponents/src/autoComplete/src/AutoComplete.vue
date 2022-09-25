<script lang="ts" setup name="VbenAutoComplete">
import { maps } from '#/index'
import { fetchProps, fetch } from '#/fetch'
import { computed, ref, watch, watchEffect } from 'vue'
const AutoComplete = maps.get('AutoComplete')
const props = defineProps({
  split: {
    type: String,
    default: '',
  },
  ...fetchProps,
})
const options = ref([])
const isFirstLoad = ref(true)
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

const option = computed(() => {
  return options.value.map((suffix) => {
    const prefix = props.value.split(props.split)[0]
    return {
      label: prefix + suffix,
      value: prefix + suffix,
    }
  })
})
</script>
<template>
  <AutoComplete v-bind="$attrs" :options="option">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></AutoComplete>
</template>

<style scoped></style>
