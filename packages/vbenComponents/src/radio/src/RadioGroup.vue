<script lang="ts" setup>
defineOptions({ name: 'VbenRadioGroup' })
import { maps } from '../../index'
import { fetchProps, fetch } from '../../fetch'
import { ref, watch, watchEffect } from 'vue'
const RadioGroup = maps.get('RadioGroup')
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
  <!--  {{ $attrs }}-->
  <RadioGroup v-bind="$attrs" :value="props.value">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
    <template v-for="item in options" :key="`${item.value}`">
      <VbenRadioButton
        v-if="$attrs.type === 'button'"
        :value="item.value"
        v-bind="item"
        :key="item.value"
        >{{ item.label }}</VbenRadioButton
      >
      <VbenRadio v-else :value="item.value" v-bind="item" :key="item.value">{{
        item.label
      }}</VbenRadio>
    </template>
  </RadioGroup>
</template>

<style scoped></style>
