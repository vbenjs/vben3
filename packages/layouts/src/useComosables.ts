import {computed, onMounted, ref, unref} from 'vue'
import { useElementSize } from '@vben/utils'

export const useComosables = ()=>{
  const headerRef = ref<HTMLElement | null>(null)
  const tabRef = ref<HTMLElement | null>(null)
  const headerHeight = ref(0)
  const headerWidth = ref(0)
  const tabHeight = ref(0)
  const tabWidth = ref(0)
  onMounted(()=>{
    const headerRefElement = useElementSize(headerRef)
    const tabRefElement = useElementSize(tabRef)
    headerHeight.value = unref(headerRefElement.height)
    headerWidth.value = unref(headerRefElement.width)
    tabHeight.value = unref(tabRefElement.height)
    tabWidth.value = unref(tabRefElement.width)

    console.log(unref(headerRefElement.height), tabHeight.value)
  })
  const omitContentHeight = computed(()=>{
    return unref(headerHeight) + unref(tabHeight)
  })
  const contentStyle = computed(()=>{
    return {
      padding: `12px`,
      height: `calc(100vh - ${unref(omitContentHeight)}px)`,
      minHeight: `calc(100vh - ${unref(omitContentHeight)}px)`
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
    contentStyle
  }
}
