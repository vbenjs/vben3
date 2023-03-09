<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { VbenColumns, VbenCellClick } from '../../../vbenComponents/src/table'
import { getTableData } from '../apis/table'

const border = ref<boolean>(false)
const loading = ref<boolean>(false)
const striped = ref<boolean>(false)

const columns: VbenColumns = [
  { field: 'userId', title: 'id', width: 100, fixed: 'left' },
  { field: 'username', title: '名称', width: 120, fixed: 'left' },
  { field: 'realname', title: '真实名称', width: 280 },
  { field: 'address', title: '地址', width: 280 },
  { field: 'startTime', title: '开始时间', width: 280 },
  { field: 'endTime', title: '结束时间', width: 280 },
  {
    field: 'desc',
    title: '备注',
    width: 280,
  },
]
const innerColumns: VbenColumns = [
  { field: 'label', title: 'label' },
  { field: 'value', title: 'value' },
]
const innerLabels: string[] = [
  'userId',
  'username',
  'realname',
  'address',
  'startTime',
  'endTime',
  'desc',
]

interface Data {
  table: {
    items: any[]
    total: number
  }
}
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
