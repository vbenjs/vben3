<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-11-16 16:32:56
 * @LastEditTime : 2023-11-28 11:24:30
 * @LastEditors  : ya2glu
 * @Description  : role manager
 * @FilePath     : \vben3\apps\admin\src\pages\demo\system\role\index.vue
-->
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useForm, useTable } from '@vben/vbencomponents'
import { roleSchema, roleColumns } from './schemas'

import RoleAddDraw from './modules/roleAddDraw.vue'
import { getRoleList } from '@/apis/sys/index'
const formRef = ref(null)
const [formReg, { getFieldValue, validate }] = useForm({
  inline: true,
  actions: true,
  schemas: roleSchema,
  actionsProps: {
    span: 8,
    submitText: '查询',
  },
})
const formModel = ref({})
const [roleTableReg, { reload }] = useTable({
  columns: roleColumns,
  api: getRoleList,
  pagination: true,
  border: 'none',
  minHeight: '700px',
  maxHeight: '700px',
  rowConfig: {
    isHover: true
  },
  stripe: true,
  round: true,
})

const roleAddDrawRef: any = ref(null)
function handleRoleAddDraw() {
  return roleAddDrawRef.value.open()
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
          v-model:model="formModel"
        />
      </VbenCard>
    </VbenGridItem>
    <VbenGridItem :span="12">
      <VbenTable @register="roleTableReg">
        <template #toolbar>
          <div class="pb-2">
            <VbenButton type="info" @click="handleRoleAddDraw"
              >新增角色</VbenButton
            >
          </div>
        </template>
        <template #action="{ row }">
          <VbenButton text type="primary">详情</VbenButton>
          <VbenDivider vertical />
          <VbenButton text type="primary">编辑</VbenButton>
          <VbenDivider vertical />
          <VbenButton text type="error">删除</VbenButton>
        </template>
      </VbenTable>
    </VbenGridItem>
  </VbenGrid>
  <RoleAddDraw ref="roleAddDrawRef" />
</template>

<style lang="less" scoped></style>
