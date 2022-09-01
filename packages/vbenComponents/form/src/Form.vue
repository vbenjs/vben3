<script lang="ts" setup name="VbenForm">
import { maps } from '../../index'
import { computed, ref, unref, useAttrs } from 'vue'
import { VbenFormProps } from './type'
const emit = defineEmits(['register'])
const innerProps = ref<Partial<VbenFormProps>>()
const Form = maps.get('Form')
const props = defineProps({
  schemas: [],
})
const attrs = useAttrs()
console.log(attrs)
//
// let domRef = ref();
//
// defineExpose({
//   domRef
// });
const getProps = computed(() => {
  const options = innerProps.value || props

  return {
    ...options,
  }
})
// const getSchema=computed(().schemas)
const setProps = (prop: Partial<VbenFormProps>) => {
  innerProps.value = { ...unref(innerProps), ...prop }
}
emit('register', { setProps })
</script>
<template>
  <Form ref="domRef" v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
    <VbenFormItem
      :label="schema.label"
      v-for="(schema, key) in innerProps.schemas"
      :key="key"
      ><VbenInput
        v-if="schema.component === 'Input'"
        v-bind="schema.componentProps"
        v-model:value="$attrs.model[schema.field]"
      ></VbenInput>
      <VbenSelect
        v-if="schema.component === 'Select'"
        v-bind="schema.componentProps"
        v-model:value="$attrs.model[schema.field]"
      ></VbenSelect>
    </VbenFormItem>
  </Form>
</template>

<style scoped></style>
