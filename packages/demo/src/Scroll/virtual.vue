<template>
  <VbenCard title="虚拟滚动组件示例" :bordered="false">
    <VbenCard title="基础滚动示例">
      <VScroll :itemHeight="40" :items="data" :height="300" width="50%">
        <template #default="{ item }">
          <div class="p-2" :style="{ border: '1px solid #eee' }">
            {{ item.title }}
          </div>
        </template>
      </VScroll>
    </VbenCard>
    <VbenCard title="预加载滚动示例">
      <div>即使不可见，也预先加载50条数据，防止空白</div>
      <VScroll
        :itemHeight="40"
        :items="data"
        :height="300"
        width="50%"
        :bench="50"
      >
        <template #default="{ item }">
          <div class="p-2" :style="{ border: '1px solid #eee' }">
            {{ item.title }}
          </div>
        </template>
      </VScroll>
    </VbenCard>
  </VbenCard>
</template>
<script lang="ts" setup>
import { VScroll } from '@vben/components'

const data = (() => {
  const arr: any[] = []
  for (let index = 1; index < 20000; index++) {
    arr.push({
      title: '列表项' + index,
    })
  }
  return arr
})()
</script>
<style lang="less" scoped></style>
