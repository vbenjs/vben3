import { computed, ref } from 'vue'

export const layoutHeader = ref(null)
// 获取header高度
export const layoutHeaderHeight = computed(
  () => layoutHeader.value?.$el.clientHeight || 0,
)
