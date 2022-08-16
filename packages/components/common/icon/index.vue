<script setup lang="ts">
import type { PropType, CSSProperties } from 'vue'
import { unref, computed, useAttrs } from 'vue'
import { createNamespace, isString } from '@vben/utils'

const props = defineProps({
  color: { type: String },
  size: {
    type: [String, Number] as PropType<string | number>,
    default: 16,
  },
  infinite: { type: Boolean },
})

const { bem } = createNamespace('iconify')

const attrs = useAttrs()

const styles = computed((): CSSProperties => {
  const { size, color } = props
  let _size = size
  if (isString(size)) {
    _size = parseInt(size, 10)
  }

  return {
    fontSize: `${_size}px`,
    color: color,
    display: 'inline-flex',
  }
})

const classes = computed(() => {
  const cls = [bem(), unref(attrs).class]
  if (props.infinite) {
    cls.push(bem('infinite'))
  }
  return cls
})
</script>

<template>
  <span :class="classes" :style="styles"></span>
</template>

<style scoped>
.iconify {
  display: inline-block;
}
.iconify__infinite {
  animation: loadingCircle 1s infinite linear;
}
</style>
