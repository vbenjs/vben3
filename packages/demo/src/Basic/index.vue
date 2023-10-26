<script lang="ts" setup>
const buttonColors = [
  'default',
  'tertiary',
  'primary',
  'info',
  'success',
  'warning',
  'error',
]

const buttonTypes = [
  {
    type: '基础按钮',
    value: '',
  },
  {
    type: '圆角按钮',
    value: 'round',
  },
  {
    type: '次要按钮',
    value: 'secondary',
  },
  {
    type: '次次要按钮',
    value: 'tertiary',
  },
  {
    type: '次次次要按钮',
    value: 'quaternary',
  },
  {
    type: '虚线按钮',
    value: 'dashed',
  },
  {
    type: '透明背景',
    value: 'ghost',
  },
]
</script>

<template>
  <div class="p-2 h-full">
    <VbenCard>
      <h2>基础组件</h2>
      <p>
        基础组件依赖于Naive-UI,组件库已有的基础组件,项目中不会再次进行demo展示（二次封装组件除外）。
        <VbenButton
          text
          tag="a"
          href="https://www.naiveui.com/zh-CN/os-theme/components/button"
          target="_blank"
          type="primary"
        >
          Naive-UI
        </VbenButton>
      </p>
    </VbenCard>
    <VbenCard class="mt-3">
      <div v-for="buttonType in buttonTypes" :key="buttonType.value">
        <h3>{{ buttonType.type }}</h3>
        <VbenButton
          class="mx-2"
          v-for="buttonColor in buttonColors"
          :[buttonType.value]="buttonType.value"
          :key="buttonColor"
          :type="buttonColor"
          >{{ buttonColor }}</VbenButton
        >
      </div>
    </VbenCard>
  </div>
</template>

<style lang="less" scoped></style>
