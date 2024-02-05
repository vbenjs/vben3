<script lang="ts" setup>
import { useTable } from '@vben/vbencomponents'
import { Description } from '@vben/components'

import {
  refundSchema,
  refundData,
  personSchema,
  personData,
  refundTableSchema,
  refundTimeTableSchema,
  refundTableData,
  refundTimeTableData,
} from './data'

const handleSummary = ({ data }) => {
  let totalT5 = 0
  let totalT6 = 0
  data.forEach((item) => {
    totalT5 += item.t5
    totalT6 += item.t6
  })
  return [['总计', '', '', '', totalT5, totalT6]]
}

const [registerRefundTable] = useTable({
  title: '退货商品',
  data: refundTableData,
  columns: refundTableSchema,
  pagination: false,
  showFooter: true,
  footerMethod: handleSummary,
  align: 'center',
})

const [registerTimeTable] = useTable({
  title: '退货进度',
  columns: refundTimeTableSchema,
  pagination: false,
  data: refundTimeTableData,
  align: 'center',
})
</script>

<template>
  <VbenCard title="基础详情页">
    <Description
      size="medium"
      title="退款申请"
      :bordered="false"
      labelPlacement="left"
      :data="refundData"
      :schema="refundSchema"
    />
    <Description
      size="medium"
      title="用户信息"
      :bordered="false"
      labelPlacement="left"
      :data="personData"
      :schema="personSchema"
    />

    <VbenTable @register="registerRefundTable">
      <template #t1_default="{ row }">
        <VbenButton text tag="a" type="info" size="small">
          {{ row.t1 }}
        </VbenButton>
      </template>
    </VbenTable>
    <VbenTable @register="registerTimeTable">
      <template #t3_default="{ row }">
        <VbenBadge type="success" dot />
        <span class="ml-2">{{ row.t3 }}</span>
      </template>
    </VbenTable>
  </VbenCard>
</template>
