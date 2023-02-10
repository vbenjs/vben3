<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  top: { type: Boolean, default: false },
  bottom: { type: Boolean, default: false },
  right: { type: Boolean, default: false },
  left: { type: Boolean, default: false },
  shadow: { type: Boolean, default: false },
})
</script>
<template>
  <div
    class="content-none absolute right-0 bg-[var(--layout-border-color)] transition-colors-300"
    :class="[
      top || bottom ? 'h-1px w-full' : 'h-full w-1px',
      {
        'top-0': right || left || top,
        'right-0': right,
        'bottom-0': bottom,
        'left-0': left || top || bottom,
        shadow: shadow,
      },
    ]"
  ></div>
</template>
