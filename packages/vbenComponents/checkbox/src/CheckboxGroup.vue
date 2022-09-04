<script lang="ts" setup name="VbenCheckboxGroup">
import { maps } from '../../index'
import Checkbox from './Checkbox.vue'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { VbenButton, VbenButtonGroup } from '../../button'
import { isFunction } from '@vben/utils'
const CheckboxGroup = maps.get('CheckboxGroup')
const props = defineProps({
  options: {
    type: Array,
    default: [],
  },
  labelField: {
    type: String,
    default: 'label',
  },
  valueField: {
    type: String,
    default: 'value',
  },
  mode: {
    type: String,
    default: 'default',
  },
  type: {
    type: String,
    default: 'default',
  },
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
const value = ref([])
const emit = defineEmits(['update:value'])
const option = computed(() => {
  const { options } = props

  return options
    ? options.map((v) => {
        return {
          label: v[props.labelField],
          value: v[props.valueField],
          selected: false,
        }
      })
    : []
})
const select = (v) => {
  const i = value.value.findIndex((a) => a == v)
  if (i === -1) {
    value.value.push(v)
  } else {
    value.value.splice(i, 1)
  }
  emit('update:value', value.value)
}
const getType = (v) => {
  if (value.value.length == 0) {
    return ''
  }
  return value.value.find((a) => a == v) ? 'primary' : ''
}
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
  <div>
    <CheckboxGroup v-bind="$attrs" v-model:value="value">
      <template v-for="item in options" :key="`${item.value}`">
        <VbenButtonGroup v-if="type === 'button'"
          ><VbenButton
            :value="item.value"
            @click="select(item.value)"
            :type="getType(item.value)"
            :disabled="item.disabled"
            >{{ item.label }}</VbenButton
          ></VbenButtonGroup
        >
        <Checkbox v-bind="item" v-else />
      </template>
    </CheckboxGroup>
  </div>
</template>

<style scoped></style>
