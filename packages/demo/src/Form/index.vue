<script lang="ts" setup>
import { ref } from 'vue'
import { useForm } from '@vben/vbencomponents/form'
import { getRadioData, getSelectData, getTreeSelectData } from '../apis/form'
const Ref = ref(null)
const selectParams = ref({ id: 1 })
const [register, { getFieldValue }] = useForm({
  schemas: [
    {
      field: 'name',
      label: 'Input',
      component: 'Input',
      componentProps: {
        placeholder: '基本的 Input',
      },
    },
    {
      field: 'user.name',
      label: '表单嵌套',
      component: 'Input',
      componentProps: {
        placeholder: '嵌套的 Input',
      },
    },
    {
      field: 'number',
      label: 'InputNumber',
      component: 'InputNumber',
      componentProps: {
        placeholder: '基本的 InputNumber',
      },
    },
    {
      field: 'password',
      label: 'InputPassword',
      component: 'InputPassword',
      componentProps: {
        placeholder: '基本的 Input',
      },
    },
    {
      field: 'textArea',
      label: 'InputTextArea',
      component: 'InputTextArea',
      componentProps: {
        placeholder: '基本的 InputTextArea',
      },
    },
    {
      field: 'sex.aa.bb',
      label: 'Select',
      component: 'Select',
      componentProps: {
        placeholder: '基本的 Select',
        api: getSelectData,
        params: selectParams,
      },
    },
    {
      field: 'treeSelect',
      label: 'TreeSelect',
      component: 'TreeSelect',
      componentProps: {
        placeholder: '基本的 TreeSelect',
        api: getTreeSelectData,
        params: selectParams,
      },
    },
    {
      field: 'radioGroup',
      label: 'RadioGroup',
      component: 'RadioGroup',
      componentProps: {
        type: 'button',
        api: getRadioData,
        params: selectParams,
      },
    },
    {
      field: 'checkboxGroup',
      label: 'CheckboxGroup',
      component: 'CheckboxGroup',
      componentProps: {
        type: 'button',
        options: [
          { label: '选项1', checked: true, value: 1 },
          { label: '选项2', checked: false, value: 2 },
        ],
        api: getRadioData,
        params: selectParams,
      },
    },
  ],
  title: '表单演示',
})
const changeSelectParams = () => {
  selectParams.value = { id: 2 }
}
const model = ref({
  haha: '11',
  user: {
    age: '22',
    name: '44',
  },
})

function getValue() {
  console.log(getFieldValue())
}
</script>
<template>
  <div class="p-2">
    表单数据：{{ model }}
    <VbenButton @click="changeSelectParams">改变选择框参数</VbenButton>
    <VbenButton @click="getValue">获取</VbenButton>
    <VbenForm @register="register" ref="Ref" v-model:model="model" />
  </div>
</template>
