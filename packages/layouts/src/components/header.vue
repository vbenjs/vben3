<script lang="ts">
export default { name: 'LayoutHeader' }
</script>
<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { createNamespace } from '@vben/utils'
const props = defineProps({
  height: {
    type: String,
    default: null,
  },
})
const { bem, cssVarBlock } = createNamespace('header')
const style = computed(
  () =>
    (props.height
      ? cssVarBlock({
          height: props.height,
        })
      : {}) as CSSProperties,
)
</script>
<template>
  <header :class="bem()" :style="style">
    <slot></slot>
  </header>
</template>

<style>
.header {
  --header-height: 48px;
  box-sizing: border-box;
  flex-shrink: 0;
  height: var(--header-height);
}
</style>
