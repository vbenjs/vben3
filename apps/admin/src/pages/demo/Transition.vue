<template>
  <div class="p-2 h-100">
    <div class="flex">
      <VbenSelect
        :options="options"
        v-model:value="value"
        placeholder="选择动画"
        :style="{ width: '150px' }"
      />
      <VbenButton type="primary" class="ml-4" @click="start">
        start
      </VbenButton>
    </div>
    <component :is="CustomTransition[value]">
      <div class="box" v-show="show"></div>
    </component>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { CustomTransition } from '@vben/components/index'

const options = Object.keys(CustomTransition).map((item) => {
  const label = item.replace('Transition', '')
  return {
    label,
    value: item,
  }
})

const value = ref('FadeTransition')
const show = ref(true)
function start() {
  show.value = false
  setTimeout(() => {
    show.value = true
  }, 300)
}
</script>
<style lang="less" scoped>
.box {
  width: 150px;
  height: 150px;
  margin-top: 20px;
  background-color: rgb(126 170 236);
}
</style>
