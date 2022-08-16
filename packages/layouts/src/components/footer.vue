<script lang="ts">
export default { name: 'LayoutFooter' }
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
const { bem, cssVarBlock } = createNamespace('footer')
const style = computed(
  () =>
    (props.height
      ? cssVarBlock({ height: props.height })
      : {}) as CSSProperties,
)
</script>
<template>
  <footer :class="bem()" :style="style">
    <slot></slot>
  </footer>
</template>

<style>
.footer {
  --footer-padding: 0 20px;
  --footer-height: 60px;
  padding: var(--footer-padding);
  box-sizing: border-box;
  flex-shrink: 0;
  height: var(--footer-height);
}
</style>
