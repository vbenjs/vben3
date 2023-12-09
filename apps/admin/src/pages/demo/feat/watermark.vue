<script lang="ts" setup>
import { ref, onUnmounted, nextTick } from 'vue'
import type { Ref } from 'vue'
import { useWatermark } from '@/hooks/web/useWatermark'

const { setWatermark, clear, clearAll } = useWatermark()
const { setWatermark: setWatermark2 } = useWatermark()

onUnmounted(() => {
  clearAll()
})
const show = ref(false)

const content = '我的水印'
const createWatermark = (cardEl) => {
  useWatermark(cardEl as Ref<HTMLElement | null>).setWatermark(content)
}
nextTick(() => {
  createWatermark(document.getElementById('cardId'))
})
</script>

<template>
  <VbenCard title="水印示例">
    <VbenWatermark
      v-if="show"
      content="大家艰苦一下，一切都会有的"
      cross
      fullscreen
      :font-size="16"
      :line-height="16"
      :width="384"
      :height="384"
      :x-offset="12"
      :y-offset="60"
      :rotate="-15"
    />
    <VbenGrid x-gap="12" :cols="2">
      <VbenGridItem>
        <VbenCard title="组件方式" style="height: 100%">
          <div class="mb-4">基于Naive UI的水印Watermark组件</div>
          <div>
            <VbenCard title="全屏水印">
              <VbenSwitch v-model:value="show" />
            </VbenCard>
            <VbenCard title="部分水印">
              <VbenWatermark
                content="核心机密"
                cross
                selectable
                :font-size="16"
                :line-height="16"
                :width="192"
                :height="128"
                :x-offset="12"
                :y-offset="28"
                :rotate="-15"
              >
                <VbenCard title="带封面的卡片" hoverable>
                  <template #cover>
                    <img src="@/assets/images/cover.png" alt="cover.png" />
                  </template>
                  样式丰富了许多,不是吗🥳
                </VbenCard>
              </VbenWatermark>
            </VbenCard>
          </div>
        </VbenCard>
      </VbenGridItem>
      <VbenGridItem>
        <VbenCard title="函数方式" style="height: 100%">
          <div class="mb-4">基于自定义hooks实现(支持防篡改)</div>
          <div>
            <VbenButton
              type="primary"
              class="mr-2"
              @click="setWatermark('WaterMark Info1')"
            >
              Create Watermark1
            </VbenButton>
            <VbenButton
              type="primary"
              class="mr-2"
              @click="setWatermark2('WaterMark Info2')"
            >
              Create Watermark2
            </VbenButton>
            <VbenButton type="error" class="mr-2" @click="clear">
              Clear Watermark1
            </VbenButton>
            <VbenButton type="error" class="mr-2" @click="clearAll">
              ClearAll
            </VbenButton>
            <VbenButton
              type="warning"
              class="mr-2"
              @click="setWatermark('WaterMark Info New')"
            >
              Update Watermark1
            </VbenButton>
            <VbenCard title="部分水印">
              <VbenCard id="cardId" title="带封面的卡片" hoverable>
                <template #cover>
                  <img src="@/assets/images/cover.png" alt="cover.png" />
                </template>
                样式丰富了许多,不是吗🥳
              </VbenCard>
            </VbenCard>
          </div>
        </VbenCard>
      </VbenGridItem>
    </VbenGrid>
  </VbenCard>
</template>
