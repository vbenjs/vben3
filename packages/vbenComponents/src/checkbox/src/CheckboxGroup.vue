<script lang="ts" setup name="VbenCheckboxGroup">
import { maps } from '#/index'
import Checkbox from './Checkbox.vue'
import { fetchProps, fetch } from '#/fetch'
import { computed, ref, useAttrs, watch, watchEffect } from 'vue'

const CheckboxGroup = maps.get('CheckboxGroup')
const props = defineProps({
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
  options: {
    type: Array,
    default: undefined,
  },
  value: {
    type: Array,
    default: undefined,
  },
})
const options = ref([])
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
  const i = value.value?.findIndex((a) => a == v)
  if (i === -1) {
    value.value.push(v)
  } else {
    value.value.splice(i, 1)
  }

  emit('update:value', value)
}
const getType = (v) => {
  if (value.value.length == 0) {
    return ''
  }
  return value.value.find((a) => a == v) ? 'primary' : ''
}
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
const update = (v) => {
  value.value = v
  emit('update:value', v)
}
</script>
<template>
  <CheckboxGroup v-bind="$attrs" @update:value="update">
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
</template>

<style scoped></style>
