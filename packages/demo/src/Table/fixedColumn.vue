<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { VbenCellClick } from '../../../vbenComponents/src/table'
import { getTableData } from '../apis/table'
import {columns,innerColumns,innerLabels} from './schemas'
import type {Data} from './schemas'

const border = ref<boolean>(false)
const loading = ref<boolean>(false)
const striped = ref<boolean>(false)

const data = reactive<Data>({
  table: {
    items: [],
    total: 0,
  },
})
getTableData().then((res) => {
  console.log(res)
  for (let i = 0; i < 4; i++) {
    res.items = res.items.concat(res.items)
  }
  console.log(res)
  data.table = res
})

const showDetails = ref<boolean>(false)
let detailData = reactive<any[]>([])
const cellClickEvent: VbenCellClick = ({ row }) => {
  detailData = innerLabels.map((field) => {
    return { label: field, value: row[field] }
  })
  showDetails.value = true
}
</script>
<template>
  <div class="p-2 h-full">
    <VbenTable
      :options="{
        title: '固定列及点击行展示详情示例',
        pagination: true,
        border: border,
        loading: loading,
        stripe: striped,
      }"
      :columns="columns"
      :data="data.table.items"
      @cell-click="cellClickEvent"
    >
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </VbenTable>
    <VbenModal v-model:show="showDetails" title="查看详情" preset="card">
      <template #default>
        <VbenTable
          border="inner"
          :sync-resize="showDetails"
          :row-config="{ isHover: true }"
          :data="detailData"
          :columns="innerColumns"
        />
      </template>
    </VbenModal>
  </div>
</template>
