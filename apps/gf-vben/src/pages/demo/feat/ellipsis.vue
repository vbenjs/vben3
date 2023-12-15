<template>
  <VbenCard title="文本省略示例">
    <VbenCard title="Ellipsis 基本使用">
      <VbenEllipsis>
        <template #tooltip>
          <div style="width: 500px">
            {{ text }}
          </div>
        </template>
        {{ text }}
      </VbenEllipsis>
    </VbenCard>
    <VbenCard title="Ellipsis 多行省略">
      <VbenEllipsis :line-clamp="2"> {{ text }}</VbenEllipsis>
    </VbenCard>
    <VbenCard title="Ellipsis 点击展开">
      <VbenEllipsis expand-trigger="click" line-clamp="2" :tooltip="false">{{
        text
      }}</VbenEllipsis>
    </VbenCard>
    <VbenCard title="Ellipsis 定制 Tooltip 内容">
      <VbenEllipsis style="max-width: 240px">
        住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
        <template #tooltip>
          <div style="text-align: center">
            《秦皇岛》<br />住在我心里孤独的<br />孤独的海怪 痛苦之王<br />开始厌倦
            深海的光 停滞的海浪
          </div>
        </template>
      </VbenEllipsis>
    </VbenCard>
  </VbenCard>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const text = ref(
  `
    Vben3 是一个免费开源的中后台模版。使用了最新的vue3,vite4,TypeScript等主流技术开发，开箱即用的中后台前端解决方案，也可用于学习参考。
    Vben3 是一个免费开源的中后台模版。使用了最新的vue3,vite4,TypeScript等主流技术开发，开箱即用的中后台前端解决方案，也可用于学习参考。
    Vben3 是一个免费开源的中后台模版。使用了最新的vue3,vite4,TypeScript等主流技术开发，开箱即用的中后台前端解决方案，也可用于学习参考。
    Vben3 是一个免费开源的中后台模版。使用了最新的vue3,vite4,TypeScript等主流技术开发，开箱即用的中后台前端解决方案，也可用于学习参考。
   `,
)
</script>
