import { computed, ref, unref } from 'vue'
import { useElementSize } from '@vben/use'
import { context } from '../bridge'
export const layoutHeader = ref(null)
// 获取header高度
export const headerRef = ref<HTMLElement | null>(null)
export const { height, width } = useElementSize(headerRef)
