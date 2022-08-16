<script lang="ts" setup>
import { PageLayout } from '@components/common'
import { createNamespace } from '@vben/utils'

const { bem } = createNamespace('layout-content')
</script>

<template>
  <div :class="bem()">
    <page-layout />
  </div>
</template>
<style lang="less" scoped>
.layout-content {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
}
</style>
