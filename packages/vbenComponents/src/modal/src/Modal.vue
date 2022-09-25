<script lang="ts" setup name="VbenModal">
import { maps } from '#/index'
import { computed } from 'vue'
const Modal = maps.get('Modal')
const props = defineProps({
  width: {
    type: [String, Number],
    default: '600px',
  },
  onPositiveClick: {
    type: Function,
    default: null,
  },
})
const bodyStyle = computed(() => {
  return {
    width: props.width,
  }
})
const emit = defineEmits(['success'])

const PositiveClick = () => {
  props.onPositiveClick && props.onPositiveClick()
  emit('success')
}
</script>
<template>
  <Modal v-bind="$attrs" :style="bodyStyle" @PositiveClick="PositiveClick">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Modal>
</template>

<style scoped></style>
