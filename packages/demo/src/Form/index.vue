<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useForm } from '@vben/vbencomponents'
import {
  getCascaderData,
  getRadioData,
  getSelectData,
  getTreeSelectData,
} from '../apis/form'

const Ref = ref(null)
const selectParams = ref({ id: 1 })
const [register, { getFieldValue, validate }] = useForm({
  // xGap: 30,
  rules: {
    number: [
      {
        required: true,
        trigger: ['input', 'blur'],
      },
    ],
  },
  schemas: [
    {
      field: 'name',
      label: 'Input',
      component: 'Input',
      defaultValue: '111',
      required: true,
      componentProps: {
        placeholder: '基本的 Input',
      },
    },
    {
      gridItemProps: {
        span: 20,
      },
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
        placeholder: '基本的 InputPassword',
      },
      rule: {
        required: true,
        trigger: ['input', 'blur'],
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
        // options: [
        //   { label: '选项1', checked: true, value: 1 },
        //   { label: '选项2', checked: false, value: 2 },
        // ],
        api: getRadioData,
        params: selectParams,
      },
    },
    {
      field: 'autoComplete',
      label: 'AutoComplete',
      component: 'AutoComplete',
      componentProps: {
        options: ['@qq.com', '@gmail.com', '@163.com'],
        split: '@',
        // api: getRadioData,
        // params: selectParams,
      },
    },
    {
      field: 'cascader',
      label: 'Cascader',
      component: 'Cascader',
      componentProps: {
        api: getCascaderData,
        params: selectParams,
        // options: ['11'],
      },
    },
    {
      field: 'datePicker',
      label: 'DatePicker',
      component: 'DatePicker',
      componentProps: {},
    },
    {
      field: 'timePicker',
      label: 'TimePicker',
      component: 'TimePicker',
      componentProps: {},
    },
    {
      field: 'divider',
      label: 'Divider',
      component: 'Divider',
      componentProps: {},
    },
    {
      field: 'switch',
      label: 'Switch',
      component: 'Switch',
      componentProps: {},
    },
    {
      field: 'rate',
      label: 'Rate',
      component: 'Rate',
      componentProps: {},
    },
    {
      field: 'slider',
      label: 'Slider',
      component: 'Slider',
      componentProps: {},
    },
    {
      field: 'colorPicker',
      label: 'ColorPicker',
      component: 'ColorPicker',
      componentProps: {},
    },
    {
      field: 'dynamicTags',
      label: 'DynamicTags',
      component: 'DynamicTags',
      componentProps: {},
    },
    {
      field: 'transfer',
      label: 'Transfer',
      component: 'Transfer',
      componentProps: {},
    },
    {
      field: 'upload',
      label: 'Upload',
      component: 'Upload',
      componentProps: {},
    },
    {
      field: 'mention',
      label: 'Mention',
      component: 'Mention',
      componentProps: {},
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
    表单数据：{{ model }}

    <VbenButton @click="changeSelectParams">改变选择框参数</VbenButton>
    <VbenButton @click="getValue">获取</VbenButton>
    <VbenForm @register="register" ref="Ref" v-model:model="model" />
  </div>
</template>
