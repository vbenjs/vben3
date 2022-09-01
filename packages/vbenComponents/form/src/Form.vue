<script lang="ts" setup name="VbenForm">
import { maps } from '../../index'
import { useAttrs } from 'vue'
const emit = defineEmits(['register'])
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
emit('register', {})
</script>
<template>
  <Form ref="domRef" v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </Form>
</template>

<style scoped></style>
