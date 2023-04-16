<script lang="ts" setup>
import { Data, treeColumns } from './schemas'
import { getTreeTableData } from '../apis/table'
import { ref, reactive } from 'vue';

const treeData = reactive<Data>({
  table: {
    items: [],
    total: 0
  }
})

getTreeTableData().then((res: any) => {
  console.log('treeData:', res);
  treeData.table.items = res
}).catch((err) => {
  console.log('err:', err);
})

function toggleExpandChangeEvent(e: any) {
  console.log('节点展开事件', e.expanded, '获取父节点：', e.$table.getParentRow(e.row))
  return;
}
</script>
<template>
  <div class="p-2 h-full">
    <VbenTable 
      :options="{
        title: '树形表格',
        border: 'inner',
        pagination: true,
      }"
      :column-config="{ resizable: true }" :columns="treeColumns" :data="treeData.table.items"
      :tree-config="{ transform: true, rowField: 'id', parentField: 'parentId' }"
      @toggle-tree-expand="toggleExpandChangeEvent">
      ></VbenTable>
  </div>
</template>

<style lang="less" scoped></style>
