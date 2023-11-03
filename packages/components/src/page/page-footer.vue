<template>
  <div :class="prefixCls" :style="{ width: `${getCalcContentWidth}` }">
    <div :class="`${prefixCls}-left`">
      <slot name="left"></slot>
    </div>

    <slot></slot>
    <div :class="`${prefixCls}-right`">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useDesign } from '@vben/hooks';
import { useMenuSetting } from '@vben/hooks';


const prefixCls = useDesign('page-footer')
const { getCalcContentWidth } = useMenuSetting();
</script>

<style lang="less" scoped>
@namespace: 'vben';
@prefix-cls: ~'@{namespace}-page-footer';

.@{prefix-cls} {
  display: flex;
  position: fixed;
  z-index: 99;
  right: 0;
  bottom: 0;
  align-items: center;
  width: 100%;
  padding: 0 24px;
  transition: width 0.2s;
  border-top: 1px solid #eee;
  background-color: #fff;
  box-shadow:
    0 -6px 16px -8px rgb(0 0 0 / 8%),
    0 -9px 28px 0 rgb(0 0 0 / 5%),
    0 -12px 48px 16px rgb(0 0 0 / 3%);
  line-height: 44px;

  &__left {
    flex: 1 1;
  }
}
</style>
