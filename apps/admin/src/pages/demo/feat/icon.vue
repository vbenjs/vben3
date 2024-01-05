<script lang="ts" setup>
import {
  QqCircleFilled,
  GithubFilled,
  WechatFilled,
  AlipayCircleFilled,
  IeCircleFilled,
  TaobaoCircleFilled,
  CodepenCircleFilled,
} from '@ant-design/icons-vue'
import { openWindow } from '@vben/utils'
import { Icon, SvgIcon, IconPicker } from '@vben/components/index'
</script>

<template>
  <VbenCard title="Icon组件示例">
    <VbenCard title="Antv Icon使用 (直接按需引入相应组件即可)">
      <div class="flex justify-around">
        <GithubFilled :style="{ fontSize: '30px' }" />
        <QqCircleFilled :style="{ fontSize: '30px' }" />
        <WechatFilled :style="{ fontSize: '30px' }" />
        <AlipayCircleFilled :style="{ fontSize: '30px' }" />
        <IeCircleFilled :style="{ fontSize: '30px' }" />
        <TaobaoCircleFilled :style="{ fontSize: '30px' }" />
        <CodepenCircleFilled :style="{ fontSize: '30px' }" />
      </div>
    </VbenCard>

    <VbenCard title="IconIfy 组件使用" class="my-5">
      <div class="flex justify-around flex-wrap">
        <Icon icon="ion:layers-outline" :size="30" />
        <Icon icon="ion:bar-chart-outline" :size="30" />
        <Icon icon="ion:tv-outline" :size="30" />
        <Icon icon="ion:settings-outline" :size="30" />
      </div>
    </VbenCard>

    <VbenCard title="svg 雪碧图" class="my-5">
      <div class="flex justify-around flex-wrap">
        <SvgIcon icon="total-sales" size="32" />
        <template v-for="item in 6" :key="item">
          <SvgIcon :icon="`dynamic-avatar-${item}`" size="32" />
        </template>
      </div>
    </VbenCard>

    <VbenCard title="图标选择器(Iconify)" class="my-5">
      <div class="flex justify-around flex-wrap">
        <IconPicker />
      </div>
    </VbenCard>

    <VbenCard title="图标选择器(Svg)" class="my-5">
      <div class="flex justify-around flex-wrap">
        <IconPicker mode="svg" />
      </div>
    </VbenCard>

    <VbenAlert title="推荐使用Iconify组件" type="info">
      Icon组件基本包含所有的图标,在下面网址内你可以查询到你想要的任何图标。并且打包只会打包所用到的图标。
    </VbenAlert>
    <VbenButton
      quaternary
      type="info"
      @click="openWindow('https://iconify.design/')"
    >
      Iconify 图标大全
    </VbenButton>
  </VbenCard>
</template>
