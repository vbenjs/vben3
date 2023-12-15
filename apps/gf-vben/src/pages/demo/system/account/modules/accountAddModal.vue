<script lang="ts" setup>
import { ref } from 'vue'
import { useForm } from '@vben/vbencomponents'
import { accountAddFormSchema } from './schemas'
const isModalShow = ref(false)

function open() {
  return (isModalShow.value = true)
}
defineExpose({
  open,
})

const model = ref({})
const [accountFormReg, { getFieldValue, validate }] = useForm({
  inline: true,
  actions: false,
  schemas: accountAddFormSchema,
  labelProps: {
    labelPlacement: 'left',
    labelAlign: 'right'
  },
  gridProps: {
    span: 24
  }
})
</script>
<template>
  <VbenModal
    v-model:show="isModalShow"
    preset="card"
    title="新增账号"
    :bordered="false"
    :closeOnEsc="false"
    :maskClosable="false"
  >
    <VbenForm
      ref="accountFormRef"
      class="w-full"
      @register="accountFormReg"
      v-model:model="model"
    >
    </VbenForm>

    <template #action>
      <div class="w-full flex justify-right">
        <VbenSpace>
          <VbenButton type="primary">新增</VbenButton>
          <VbenButton type="tertiary">取消</VbenButton>
        </VbenSpace>
      </div>
    </template>
  </VbenModal>
</template>

<style lang="less" scoped></style>
