<script lang="ts" setup>
import { context } from '../../../bridge'
import { createNamespace } from '@vben/utils'

const { useMenuSetting } = context
const { toggleCollapsed, getCollapsed } = useMenuSetting()

const { bem } = createNamespace('footer-trigger')
</script>
<template>
  <span :class="bem()" @click="toggleCollapsed">
    <VbenIconify v-if="getCollapsed" icon="ph:caret-double-right-bold" />
    <VbenIconify v-else icon="ph:caret-double-left-bold" />
  </span>
</template>

<style lang="less" scoped>
.footer-trigger {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
