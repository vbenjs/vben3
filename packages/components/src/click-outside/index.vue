<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vben/utils'

const emit = defineEmits(['mounted', 'clickOutside'])
const wrap = ref<any>(null)

onClickOutside(wrap, () => {
  emit('clickOutside')
})

onMounted(() => {
  emit('mounted')
})
</script>

<template>
  <div ref="wrap">
    <slot></slot>
  </div>
</template>
