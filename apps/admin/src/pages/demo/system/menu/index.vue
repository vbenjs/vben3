<script lang="ts" setup>
import { ref } from 'vue'
import { useForm, useTable } from '@vben/vbencomponents'
import { formSchema, menuColumns } from './schemas'

import MenuAddDraw from './modules/menuAddDraw.vue'

const formRef = ref(null)
const [formReg, { getFieldValue, validate }] = useForm({
  inline: true,
  actions: true,
  schemas: formSchema,
  actionsProps: {
    span: 8,
    submitText: '查询',
  },
})
const formModel = ref({})

// const treeTableData = reactive<>({})
const [menuTableReg, {}] = useTable({
  // title: '菜单列表',
  columns: menuColumns,
  data: [],
  pagination: true,
  border: 'inner',
  treeConfig: {
    transform: true,
    rowField: 'id',
    parentField: 'parentId'
  }
})

const menuAddDrawRef = ref(null)
function handleMenuAddDraw() {
  return menuAddDrawRef.value.open();
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
      <VbenTable ref="menuTreeTable" @register="menuTableReg">
        <template #toolbar>
          <div class="pb-2">
            <VbenButton type="info" @click="handleMenuAddDraw">新增菜单</VbenButton>
          </div>
        </template>
      </VbenTable>
    </VbenGridItem>
  </VbenGrid>
  <MenuAddDraw ref="menuAddDrawRef" />
</template>

<style lang="less" scoped></style>
