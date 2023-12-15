<script lang="ts" setup>
import { ref } from 'vue'
import { ClickOutside } from '@vben/components/index'

const text = ref('Click')
function handleClickOutside() {
  text.value = 'Click Out Side'
}

function innerClick() {
  text.value = 'Click Inner'
}
</script>

<template>
  <VbenCard title="点内外部触发事件">
    <ClickOutside
      @clickOutside="handleClickOutside"
      class="flex justify-center"
    >
      <div @click="innerClick" class="demo-box">
        {{ text }}
      </div>
    </ClickOutside>
  </VbenCard>
</template>

<style lang="less" scoped>
.demo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  border-radius: 10px;
  background-color: #408ede;
  color: #fff;
  font-size: 24px;
}
</style>
