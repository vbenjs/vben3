<script lang="ts" setup>
import { Data, treeColumns } from './schemas'
import { getTreeTableData } from '../apis/table'
import { ref, reactive } from 'vue'

const treeData = reactive<Data>({
  table: {
    items: [],
    total: 0,
  },
})
const treeTable = ref(null)

getTreeTableData()
  .then((res: any) => {
    console.log('treeData:', res)
    treeData.table.items = res
  })
  .catch((err) => {
    console.log('err:', err)
  })

function toggleExpandChangeEvent(e: any) {
  console.log(
    '节点展开事件',
    e.expanded,
    '获取父节点：',
    e.$table.getParentRow(e.row),
  )
  return
}
console.log("refs:", treeTable.value);

function handleSelected() {
  return null
}

function handleExpanded() {
  return null
}

function handleExpandAll() {
  return null
}

function handleCloseAll() {
  return null
}
</script>
<template>
  <div class="p-2 h-full">
    <VbenTable
      ref="treeTable"
      :options="{
        title: '基础树形表格',
        border: 'inner',
        pagination: true,
      }"
      :column-config="{ resizable: true }"
      :columns="treeColumns"
      :data="treeData.table.items"
      :tree-config="{
        transform: true,
        rowField: 'id',
        parentField: 'parentId',
        iconOpen: 'vxe-icon-square-minus',
        iconClose: 'vxe-icon-square-plus',
      }"
      :checkbox-config="{ labelField: 'id', highlight: true }"
      @toggle-tree-expand="toggleExpandChangeEvent"
    >
      >
      <template #toolbar>
        <div class="pb-2">
          <VbenButton class="ml-2" type="info" ghost @click="handleSelected"
            >获取选中</VbenButton
          >
          <VbenButton class="ml-2" type="info" ghost @click="handleExpanded"
            >获取已展开</VbenButton
          >
          <VbenButton
            class="ml-2"
            type="info"
            ghost
            @click="$refs.treeTable.setAllTreeExpand(true)"
            >展开所有</VbenButton
          >
          <VbenButton class="ml-2" type="info" ghost @click="handleCloseAll"
            >关闭所有</VbenButton
          >
        </div>
      </template>
    </VbenTable>
  </div>
</template>

<style lang="less" scoped></style>
