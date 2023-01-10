import {computed, ref, unref} from 'vue'
import {useElementSize} from '@vben/utils'
import {context} from '../bridge'

export const useComosables = () => {
  const {useHeaderSetting} = context
  // @ts-ignore
  const {getFixed: getHeaderFixed} = useHeaderSetting();
  const headerRef = ref<HTMLElement | null>(null)
  const tabRef = ref<HTMLElement | null>(null)
  const contentRef = ref<HTMLElement | null>(null)
  const footerRef = ref<HTMLElement | null>(null)
  const {height: headerHeight, width: headerWidth} = useElementSize(headerRef)
  const {height: tabHeight, width: tabWidth} = useElementSize(tabRef)
  const {height: contentRefHeight, width: contentRefWidth} = useElementSize(contentRef)
  const {height: footerHeight, width: footerWidth} = useElementSize(footerRef)
  const omitContentHeight = computed(() => {
    return unref(headerHeight) + unref(tabHeight)
  })
  const contentHeight = computed(() => {
    return unref(getHeaderFixed) ? `calc(100vh - ${unref(omitContentHeight)}px)` : 'auto'
  })
  const contentStyle = computed(() => {
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
    contentRefHeight,
    contentRefWidth,
    footerHeight,
    footerWidth,
    omitContentHeight,
    contentHeight,
    contentStyle,
    contentRef,
    footerRef
  }
}
