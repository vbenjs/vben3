<script lang="ts" setup>
import { rippleDirective as vRipple } from '@vben/directives'
</script>

<template>
  <VbenCard title="Ripple示例">
    <div class="demo-box" v-ripple>content</div>
  </VbenCard>
</template>

<style lang="less" scoped>
.demo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  border-radius: 10px;
  background-color: #408ede;
  color: #fff;
  font-size: 24px;
}
</style>
