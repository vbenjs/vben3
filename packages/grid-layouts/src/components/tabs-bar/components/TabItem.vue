<script lang="ts" setup>
import { defineProps } from 'vue'
defineProps({
  closable: { type: Boolean, default: true },
  active: { type: Boolean, default: false },
  title: { type: String },
})

const emit = defineEmits(['close'])

const handleClose = (e: PointerEvent) => {
  e.stopPropagation()
  emit('close')
}
</script>
<template>
  <div
    class="group py-3px pl-10px hover:text-[var(--n-tab-text-color-active)]"
    :class="[closable ? 'pr-18px' : 'pr-10px']"
  >
    <span>{{ title }}</span>
    <VbenIconify
      v-if="closable"
      class="absolute !transition-all top-1/2 ml-2px mt--6px hover:!text-14px hover:nt--6px group-hover:visible"
      :class="[active ? 'visible' : 'invisible']"
      size="12"
      icon="ep:close-bold"
      @click.stop="handleClose($event)"
    />
  </div>
</template>
