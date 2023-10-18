<script lang="ts" setup>
import { context } from '../../../bridge'
import { createNamespace } from '@vben/utils'

const { useMenuSetting } = context
const { toggleCollapsed, getCollapsed } = useMenuSetting()

const { bem } = createNamespace('header-trigger')
</script>
<template>
  <span :class="bem()" @click="toggleCollapsed">
    <VbenIconify v-if="getCollapsed" icon="ant-design:menu-unfold-outlined" />
    <VbenIconify v-else icon="ant-design:menu-fold-outlined" />
  </span>
</template>

<style lang="less" scoped>
.header-trigger {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 4px;
}
</style>
