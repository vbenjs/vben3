<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, useAttrs, unref } from 'vue'
import { createNamespace } from '@vben/utils'

const attrs = useAttrs()

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 16,
  },
  infinite: {
    type: Boolean,
    default: false,
  },
})

const { bem } = createNamespace('svg-icon')

const symbolId = computed(() => `#${props.prefix}-${props.icon}`)

const classes = computed(() => {
  const cls = [bem(), unref(attrs).class]
  props.infinite && cls.push(bem('infinite'))
  return cls
})

const svgStyle = computed((): CSSProperties => {
  const { size } = props
  const _size = `${`${size}`.replace('px', '')}px`
  return {
    width: _size,
    height: _size,
  }
})
</script>

<template>
  <svg :class="classes" :style="svgStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<style scoped>
.svg-icon {
  display: inline-block;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}
.svg-icon__infinite {
  animation: loadingCircle 1s infinite linear;
}
</style>
