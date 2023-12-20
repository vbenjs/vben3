<script lang="ts" setup>
import { ref } from 'vue'
import { useFullscreen } from '@vben/utils'

const domRef = ref<Nullable<HTMLElement>>(null)

const { enter, toggle, exit, isFullscreen } = useFullscreen()

const { toggle: toggleDom, isFullscreen: isDomFullscreen } =
  useFullscreen(domRef)
</script>
<template>
  <VbenCard title="全屏示例">
    <VbenCard title="Window Full Screen">
      <VbenButton
        type="primary"
        :disabled="isFullscreen"
        @click="enter"
        class="mr-2"
      >
        Enter Window Full Screen
      </VbenButton>
      <VbenButton type="success" @click="toggle" class="mr-2">
        Toggle Window Full Screen
      </VbenButton>

      <VbenButton type="error" @click="exit" class="mr-2">
        Exit Window Full Screen
      </VbenButton>

      Current State: {{ isFullscreen }}
    </VbenCard>

    <VbenCard title="Dom Full Screen">
      <VbenButton type="primary" @click="toggleDom" class="mr-2">
        Enter Dom Full Screen
      </VbenButton>
    </VbenCard>

    <div
      ref="domRef"
      class="flex items-center justify-center w-1/2 h-64 mx-auto mt-10 bg-white rounded-md"
    >
      <VbenButton type="primary" @click="toggleDom" class="mr-2">
        {{ isDomFullscreen ? 'Exit Dom Full Screen' : 'Enter Dom Full Screen' }}
      </VbenButton>
    </div>
  </VbenCard>
</template>
