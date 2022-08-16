<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { createNamespace } from '@vben/utils'

const props = defineProps({
  width: {
    type: String,
    default: null,
  },
})

const { bem, cssVarBlock } = createNamespace('aside')

const style = computed(() => {
  return props.width
    ? (cssVarBlock({ width: props.width }) as CSSProperties)
    : {}
})
</script>

<template>
  <aside :class="bem()" :style="style">
    <slot></slot>
  </aside>
</template>

<style scoped>
.aside {
  background-color: var(--aside-background-color);
  --aside-width: 210px;
  overflow: auto;
  box-sizing: border-box;
  flex-shrink: 0;
  width: var(--aside-width);
}
</style>
