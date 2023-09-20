<script lang="ts" setup>
import { context } from '../../../bridge'
import { createNamespace } from '@vben/utils'

const { useMenuSetting } = context
const { toggleCollapsed, getCollapsed } = useMenuSetting()

const { bem } = createNamespace('side-menu')
</script>
<template>
  <div :class="bem('trigger')" @click.stop="toggleCollapsed">
    <VbenIconify v-if="getCollapsed" icon="ph:caret-double-right-bold" />
    <VbenIconify v-else icon="ph:caret-double-left-bold" />
  </div>
</template>

<style lang="less" scoped>
.side-menu {
  &__trigger {
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
}
</style>
