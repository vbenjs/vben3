<script lang="ts" setup>
import { ref } from 'vue'
import { useForm } from '@vben/vbencomponents/form'
import { getSelectData } from '../apis/form'
const Ref = ref(null)
const selectParams = ref({ id: 1 })
const [register] = useForm({
  schemas: [
    {
      field: 'name',
      label: '姓名',
      component: 'Input',
      componentProps: {
        placeholder: '基本的 Input',
      },
    },
    {
      field: 'sex',
      label: '性别',
      component: 'Select',
      componentProps: {
        placeholder: '基本的 Select',
        api: getSelectData,
        params: selectParams,
      },
    },
  ],
  title: '表单演示',
})
const changeSelectParams = () => {
  selectParams.value = { id: 2 }
}
</script>
<template>
  <div class="p-2">
    <VbenButton @click="changeSelectParams">改变选择框参数</VbenButton>
    <VbenForm @register="register" ref="Ref" />
  </div>
</template>
