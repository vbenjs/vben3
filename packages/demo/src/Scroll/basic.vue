<script lang="ts" setup></script>

<template>
  <VbenCard title="滚动组件示例" :bordered="false">
    <div class="scroll-wrap">
      <VbenScrollbar>
        <template v-for="index in 100" :key="index">
          <div class="p-2" :style="{ border: '1px solid #eee' }">
            {{ index }}
          </div>
        </template>
      </VbenScrollbar>
    </div>
  </VbenCard>
</template>

<style lang="less" scoped>
.scroll-wrap {
  width: 50%;
  height: 300px;
}
</style>
