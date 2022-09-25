<script lang="ts" setup name="VbenCascader">
import { maps } from '#/index'
import { fetchProps, fetch } from '#/fetch'
import { ref, watch, watchEffect } from 'vue'
const Cascader = maps.get('Cascader')
const props = defineProps({
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
</script>
<template>
  <Cascader v-bind="$attrs" :options="options">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Cascader>
</template>

<style scoped></style>
