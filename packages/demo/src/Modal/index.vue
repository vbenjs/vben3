<script lang="ts" setup>
import { ref } from 'vue';

let   isModalShow = ref(false)
const cTitle      = ref('这个模态框里装了一个卡片📇')
</script>
<template>
  <div class="m-2">
    <VbenAlert type="info">
      这个模态框本质是一个弹出的遮罩层,在遮罩层里你可以定义任意类型的 Card, dialog, 或者不定义😎, Vben并没有封装默认的类型,所以你可以根据自己的实际业务定制🦄
    </VbenAlert>
    <VbenButton @click="isModalShow = true">点 我</VbenButton>
    <VbenModal :show="isModalShow">
      <VbenCard class="w-1/2" :title="cTitle" role="dialog"></VbenCard>
    </VbenModal>
  </div>
</template>

<style lang="less" scoped></style>
