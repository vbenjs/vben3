<script lang="ts" setup name="VbenForm">
import { maps } from '../../index'
import { computed, Ref, ref, unref, useAttrs, watch, watchEffect } from 'vue'
import { GridItemProps, VbenFormProps } from './type'
import { set, get, isEqual } from '@vben/utils'
const emit = defineEmits(['register', 'update:model'])
const innerProps = ref<Partial<VbenFormProps>>()
const Form = maps.get('Form')
const props = defineProps({
  schemas: [],
})
const attrs = useAttrs()
const getProps = computed(() => {
  const options = innerProps.value || props

  return {
    ...options,
  }
})
const setProps = (prop: Partial<VbenFormProps>) => {
  innerProps.value = {
    ...prop,
    ...unref(innerProps),
  }
}
const fieldValue = ref({})
watch(
  () => attrs.model,
  () => {
    const m = JSON.parse(JSON.stringify(attrs.model))
    sObject(m)
  },
  { deep: true, immediate: true },
)
watch(
  () => fieldValue,
  () => {
    emit('update:model', getFieldValue())
  },
  { deep: true },
)
function sObject(m, key?) {
  Object.keys(m).forEach((k) => {
    const tempKey = key ? key + '.' + k : k
    if (typeof m[k] == 'object') {
      sObject(m[k], tempKey)
      return
    }
    fieldValue.value[tempKey] = m[k]
  })
}
function getFieldValue() {
  const m = JSON.parse(JSON.stringify(fieldValue.value))
  Object.keys(m).forEach((k) => {
    if (k.indexOf('.') != -1) {
      const v = m[k]
      delete m[k]
      set(m, k, v)
    }
  })
  return m
}
// 默认gridItem参数
const getGridItemProps = (p) => {
  return { span: getGridProps.value.span, ...p }
}
// 默认grid参数

const getGridProps = computed(() => {
  return {
    cols: 24,
    span: 8,
    xGap: 12,
    yGap: 0,
    ...innerProps.value.gridProps,
  }
})

emit('register', { setProps, getFieldValue })
</script>
<template>
  <div>
    <!--    {{ fieldValue }}-->
    <Form ref="domRef" v-bind="$attrs">
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
      <VbenGrid v-bind="getGridProps">
        <VbenGridItem
          v-bind="getGridItemProps(schema.gridItemProps)"
          v-for="(schema, key) in innerProps.schemas"
          :key="key"
          :path="schema.field"
        >
          <VbenFormItem :label="schema.label" :path="schema.field">
            <component
              v-if="
                schema.componentProps !== 'InputPassword' ||
                schema.component !== 'InputTextArea'
              "
              :is="`Vben${schema.component}`"
              v-bind="schema.componentProps"
              v-model:value="fieldValue[schema.field]"
            />
            <VbenInput
              type="password"
              v-if="schema.component === 'InputPassword'"
              v-bind="schema.componentProps"
              v-model:value="fieldValue[schema.field]"
            />
            <VbenInput
              type="textarea"
              v-if="schema.component === 'InputTextArea'"
              v-bind="schema.componentProps"
              v-model:value="fieldValue[schema.field]"
            />
          </VbenFormItem>
        </VbenGridItem>
      </VbenGrid>
    </Form>
  </div>
</template>

<style scoped></style>
