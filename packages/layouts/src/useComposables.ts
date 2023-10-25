import { computed, ref, unref } from 'vue'
import { useElementSize } from '@vben/utils'
import { context } from '../bridge'

export const useComposables = () => {
  const { useHeaderSetting } = context
  const { getFixed: getHeaderFixed } = useHeaderSetting()

  const headerRef = ref<HTMLElement | null>(null)
  const { height: headerHeight, width: headerWidth } = useElementSize(headerRef)

  const contentRef = ref<HTMLElement | null>(null)

  const tabRef = ref<HTMLElement | null>(null)
  const { height: tabHeight, width: tabWidth } = useElementSize(tabRef)

  const footerRef = ref<HTMLElement | null>(null)
  const { height: footerHeight, width: footerWidth } = useElementSize(footerRef)

  const omitContentHeight = computed(() => {
    return unref(headerHeight) + unref(tabHeight)
  })
  const contentFixedHeight = computed(() => {
    return unref(getHeaderFixed)
      ? `calc(100vh - ${unref(omitContentHeight)}px)`
      : 'auto'
  })
  const contentStyle = computed(() => {
    return {
      height: unref(contentFixedHeight),
      minHeight: unref(contentFixedHeight),
    }
  })
  const mainStyle = computed(() => {
    return {
      minHeight: `calc(100vh - ${
        unref(omitContentHeight) + unref(footerHeight)
      }px)`,
    }
  })
  return {
    headerRef,
    contentRef,
    tabRef,
    footerRef,
    headerHeight,
    headerWidth,
    tabHeight,
    tabWidth,
    footerHeight,
    footerWidth,
    omitContentHeight,
    contentStyle,
    mainStyle,
  }
}
