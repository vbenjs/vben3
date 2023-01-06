import {computed, onMounted, ref, unref} from 'vue'
import { useElementSize } from '@vben/utils'

export const useComosables = ()=>{
  const headerRef = ref<HTMLElement | null>(null)
  const tabRef = ref<HTMLElement | null>(null)
  const { height: headerHeight, width: headerWidth } = useElementSize(headerRef)
  const { height: tabHeight, width: tabWidth } = useElementSize(tabRef)
  const omitContentHeight = computed(()=>{
    return unref(headerHeight) + unref(tabHeight)
  })
  const contentHeight = computed(()=>{
    return `calc(100vh - ${unref(omitContentHeight)}px)`
  })
  const contentStyle = computed(()=>{
    return {
      height: unref(contentHeight),
      minHeight: unref(contentHeight)
    }
  })
  return {
    headerRef,
    tabRef,
    headerHeight,
    headerWidth,
    tabHeight,
    tabWidth,
    omitContentHeight,
    contentHeight,
    contentStyle
  }
}
