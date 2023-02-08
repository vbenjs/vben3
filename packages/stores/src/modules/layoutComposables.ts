import { defineStore } from 'pinia'
import { useElementSize } from '@vben/utils'
import { ref } from 'vue'

export const useLayoutHeader = defineStore('LAYOUT_HEADER', () => {
  const headerRef = ref<HTMLElement>()

  const { height: headerHeight, width: headerWidth } = useElementSize(headerRef)

  return {
    headerRef,
    headerHeight,
    headerWidth,
  }
})

export const useLayoutSidebar = defineStore('LAYOUT_SIDEBAR', () => {
  const sidebarRef = ref<HTMLElement>()

  const { height: sidebarHeight, width: sidebarWidth } =
    useElementSize(sidebarRef)

  return {
    sidebarRef,
    sidebarHeight,
    sidebarWidth,
  }
})

export const useLayoutTab = defineStore('LAYOUT_TAB', () => {
  const tabRef = ref<HTMLElement>()

  const { height: tabHeight, width: tabWidth } = useElementSize(tabRef)

  return {
    tabRef,
    tabHeight,
    tabWidth,
  }
})

export const useLayoutContent = defineStore('LAYOUT_FOOTER', () => {
  const contentRef = ref<HTMLElement>()

  const { height: contentHeight, width: contentWidth } =
    useElementSize(contentRef)

  return {
    contentRef,
    contentHeight,
    contentWidth,
  }
})

export const useLayoutFooter = defineStore('LAYOUT_FOOTER', () => {
  const footerRef = ref<HTMLElement>()

  const { height: footerHeight, width: footerWidth } = useElementSize(footerRef)

  return {
    footerRef,
    footerHeight,
    footerWidth,
  }
})
