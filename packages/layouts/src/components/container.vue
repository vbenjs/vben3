<script lang="ts" setup>
import type { Component, VNode } from 'vue'
import { computed, useSlots } from 'vue'
import { createNamespace } from '@vben/utils'

const props = defineProps({
  direction: {
    type: String,
    default: '',
  },
})

const { bem } = createNamespace('container')
const slots = useSlots()

const isVertical = computed(() => {
  if (props.direction === 'vertical') {
    return true
  } else if (props.direction === 'horizontal') {
    return false
  }
  if (slots && slots.default) {
    const vNodes: VNode[] = slots.default()

    return vNodes.some((vNode) => {
      const tag = (vNode.type as Component).name
      return tag === 'LayoutHeader' || tag === 'LayoutFooter'
    })
  } else {
    return false
  }
})
</script>

<template>
  <section :class="bem({ 'is-vertical': isVertical })">
    <slot></slot>
  </section>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
  height: 100%;
}
.container.is-vertical {
  flex-direction: column;
}
</style>
