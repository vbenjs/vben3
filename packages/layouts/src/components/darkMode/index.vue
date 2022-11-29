<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  isDark: { type: Boolean, default: false },
})
const emit = defineEmits(['change'])

const onChange = (v) => {
  emit('change', v)
  console.log(v)
}
</script>

<template>
  <VbenSwitch :value="isDark" @update:value="onChange">
    <template #checked-icon>
      <VbenIconify icon="emojione:crescent-moon" hoverPointer />
    </template>
    <template #unchecked-icon>
      <VbenIconify icon="emojione:sun-with-face" hoverPointer />
    </template>
  </VbenSwitch>
</template>
