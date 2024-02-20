<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { VbenCellClick } from '../../../vbenComponents/src/table'
import { getTableData } from '../apis/table'
import {fixedColumns,innerColumns,innerLabels} from './schemas'
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
  data.table.items = res
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
        api: getTableData
      }"
      :columns="fixedColumns"
      :row-config="{isHover: true}"
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
          :options="{
            api: null
          }"
          :sync-resize="showDetails"
          :row-config="{ isHover: true }"
          :data="detailData"
          :columns="innerColumns"
        />
      </template>
    </VbenModal>
  </div>
</template>
