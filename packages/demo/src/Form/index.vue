<script lang="ts" setup>
import { ref } from 'vue'
import { useForm } from '@vben/vbencomponents/form'
const Ref = ref(null)
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
      },
    },
  ],
  title: '表单演示',
})
</script>
<template>
  <div class="p-2">
    <VbenForm @register="register" ref="Ref" />
  </div>
</template>
