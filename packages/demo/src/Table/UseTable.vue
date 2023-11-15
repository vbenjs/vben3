<script lang="ts" setup>
import { ref } from 'vue'
import { VbenColumns, useTable } from '@vben/vbencomponents/src/table'
import { getUseTableData } from '../apis/table'
const columns: VbenColumns = [
  { field: 'userId', title: 'id', width: 100 },
  { field: 'username', title: '名称', width: 150 },
  {
    field: 'desc',
    title: '备注',
    width: 150,
    slots: {
      default: 'desc_default',
    },
  },
]
const Ref = ref(null)
const [registerTable, { reload }] = useTable({
  title: '角色列表',
  border: true,
  api: getUseTableData,
  params: {
    i: 'role',
    a: 'list',
  },
  stripe: true,
  pagination: true,
  align: 'center',
  columns,
})
</script>
<template>
  <div class="p-2">
    <VbenTable @register="registerTable">
      <template #desc_default="{ row, rowIndex }">
        {{ row.desc }}
      </template>
    </VbenTable>
  </div>
</template>
