import { ref } from 'vue'
import { useElementSize } from '@vben/utils'
import { context } from '../bridge'
export const layoutHeader = ref(null)
// 获取header高度
// @ts-ignore
export const headerRef = ref<HTMLElement | null>(null)
// @ts-ignore
export const { height, width } = useElementSize(headerRef)
