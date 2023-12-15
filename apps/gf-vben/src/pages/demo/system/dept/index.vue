<script lang="ts" setup>
import { ref } from 'vue'
import { useForm, useTable } from '@vben/vbencomponents'
import { formSchema, deptColumns } from './schemas'
import { getDepartment } from '@/apis/sys/index'
import DeptAddDraw from './modules/deptAddDraw.vue'
const formRef = ref(null)
const formModel = ref({})
const [formReg, {}] = useForm({
  inline: true,
  actions: true,
  schemas: formSchema,
  actionsProps: {
    span: 8,
    submitText: '查询',
  },
})
const [deptTableReg, {}] = useTable({
  columns: deptColumns,
  api: getDepartment,
  border: 'none',
  pagination: false,
  minHeight: '700px',
  rowConfig: {
    isHover: true,
  },
  round: true,
  treeConfig: {
    transform: 'true',
    rowField: 'id',
    parentField: 'parentId',
    iconOpen: 'vxe-icon-square-minus',
    iconClose: 'vxe-icon-square-plus',
  },
})
function handleDetail(row) {
  console.log(row)
  return null
}
const deptAddDrawRef: any = ref(null)

function addDept() {
  return deptAddDrawRef.value.open()
}
</script>
<template>
  <VbenGrid style="padding: 20px" :cols="12" :x-gap="8" :y-gap="12">
    <VbenGridItem :span="12">
      <VbenCard :bordered="false" embedded>
        <VbenForm
          ref="formRef"
          class="w-full"
          @register="formReg"
          :model="formModel"
        />
      </VbenCard>
    </VbenGridItem>
    <VbenGridItem :span="12">
      <VbenTable @register="deptTableReg">
        <template #toolbar>
          <div class="pb-2">
            <VbenButton type="info" @click="addDept()">新增部门</VbenButton>
          </div>
        </template>
        <template #action="{ row }">
          <VbenButton text type="primary" @click="handleDetail(row)"
            >详情</VbenButton
          >
          <VbenDivider vertical />
          <VbenButton text type="primary">编辑</VbenButton>
          <VbenDivider vertical />
          <VbenButton text type="error">删除</VbenButton>
        </template>
      </VbenTable>
    </VbenGridItem>
  </VbenGrid>
  <DeptAddDraw ref="deptAddDrawRef" />
</template>

<style lang="less" scoped></style>
