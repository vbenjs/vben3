<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useForm } from '@vben/vbencomponents'

import { transferFormilySchemas } from '@vben/vbencomponents/src/form'
import { FormilyProps, BasicProps, selectParams } from './schemas'

const Ref = ref(null)

const [register, { getFieldValue, validate }] = useForm({
  actions: true,
  actionsProps: {
    span: 12,
    submitText: '好的',
  },
  // xGap: 30,
  rules: {
    number: [
      {
        required: true,
        trigger: ['input', 'blur'],
      },
    ],
  },
  schemas: transferFormilySchemas(FormilyProps),
  title: '表单演示',
})
const changeSelectParams = () => {
  selectParams.value = { id: 2 }
}
const model = ref({
  haha: '11',
  user: {
    age: '22',
    name: '',
  },
})
const value = ref()

function getValue() {
  validate()
  console.log(getFieldValue())
}
</script>
<template>
  <div class="p-2">
    <div>表单数据：{{ model }}</div>

    <VbenButton @click="changeSelectParams">改变选择框参数</VbenButton>
    <VbenButton @click="getValue">获取数据</VbenButton>
    <VbenForm @register="register" ref="Ref" v-model:model="model" />
  </div>
</template>
