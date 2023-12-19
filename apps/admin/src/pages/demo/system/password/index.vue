<script lang="ts" setup>
import { ref } from 'vue'
import { useForm } from '@vben/vbencomponents'
import { formSchema } from './schemas'
const formModel = ref({})

const [pwdFormReg, {}] = useForm({
  actions: false,
  schemas: formSchema,
  gridProps: {
    span: 12
  }
})
</script>

<template>
  <VbenGrid style="padding: 20px" :cols="12" :x-gap="8" :y-gap="12">
    <VbenGridItem :span="5" :offset="3">
      <VbenCard :bordered="false" embedded>
        <VbenForm @register="pwdFormReg" :model="formModel" />
      </VbenCard>
    </VbenGridItem>
  </VbenGrid>
</template>

<style lang="less" scoped></style>
