<script lang="ts" setup>
import { CountTo } from '@vben/components'
</script>

<template>
  <VbenCard title="数字动画示例" :bordered="false">
    <VbenGrid :x-gap="12" :y-gap="8" :cols="2">
      <VbenGridItem>
        <VbenCard hoverable>
          <CountTo
            class="count-to-demo-card"
            prefix="$"
            :color="'#409EFF'"
            :startVal="1"
            :endVal="200000"
            :duration="8000"
          />
        </VbenCard>
      </VbenGridItem>
      <VbenGridItem>
        <VbenCard hoverable>
          <CountTo
            class="count-to-demo-card"
            suffix="$"
            :color="'red'"
            :startVal="1"
            :endVal="300000"
            :decimals="2"
            :duration="6000"
          />
        </VbenCard>
      </VbenGridItem>
      <VbenGridItem>
        <VbenCard hoverable>
          <CountTo
            class="count-to-demo-card"
            suffix="$"
            :color="'rgb(0,238,0)'"
            :startVal="1"
            :endVal="400000"
            :duration="7000"
          />
        </VbenCard>
      </VbenGridItem>
      <VbenGridItem>
        <VbenCard hoverable>
          <CountTo
            class="count-to-demo-card"
            separator="-"
            :color="'rgba(138,43,226,.6)'"
            :startVal="10000"
            :endVal="500000"
            :duration="8000"
          />
        </VbenCard>
      </VbenGridItem>
    </VbenGrid>
  </VbenCard>
</template>

<style lang="less" scoped>
.count-to-demo {
  &-card {
    font-size: 30px;
  }
}
</style>
