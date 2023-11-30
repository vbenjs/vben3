<script lang="ts" setup>
import { ref } from 'vue'
import { useForm } from "@vben/vbencomponents";
import { deptAddFormSchema } from './schemas'
const deptDrawFlag = ref(false)
function open() {
  return (deptDrawFlag.value = true)
}
function close() {
  return (deptDrawFlag.value = false)
}
defineExpose({
  open,
})

const [deptFormReg,{}] = useForm({
  inline: true,
  actions: false,
  schemas: deptAddFormSchema
})
const model = ref({})
</script>
<template>
  <VbenDrawer
    v-model:show="deptDrawFlag"
    :width="500"
    placement="right"
    :mask-closable="false"
  >
    <VbenDrawerContent closable>
      <template #header>新增部门</template>
      <VbenForm
        ref="deptFormRef"
        class="w-full"
        @register="deptFormReg"
        v-model:model="model"
      />
      <template #footer>
        <VbenSpace>
          <VbenButton type="primary">新增</VbenButton>
          <VbenButton type="tertiary" @click="close">取消</VbenButton>
        </VbenSpace>
      </template>
    </VbenDrawerContent>
  </VbenDrawer>
</template>

<style lang="less" scoped></style>
