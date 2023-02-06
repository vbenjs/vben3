import { useMenuSettingStore } from '../store/modules/menuSetting'
import { computed } from 'vue'
import {
  useHeaderSettingStore,
  useMultiTabsSettingStore,
  useSporadicSettingStore,
} from '../store'

export const useComprehensive = () => {
  const menuSettingStore = useMenuSettingStore()
  const headerSettingStore = useHeaderSettingStore()
  const multipleTabStore = useMultiTabsSettingStore()
  const sporadicSettingStore = useSporadicSettingStore()
  const getLayoutStyles = computed(() => {
    const getAsideWidth = () => {
      if (menuSettingStore.isMixSidebar) return menuSettingStore.mixSidebarWidth
      if (menuSettingStore.collapsed) return menuSettingStore.collapsedWidth
      if (menuSettingStore.isTopMenu || menuSettingStore.hidden) return 0
      return menuSettingStore.width
    }

    const getHeaderHeight = () => {
      if (headerSettingStore.hidden) return 0
      return headerSettingStore.height
    }

    const getTabBarHeight = () => {
      if (multipleTabStore.hidden) return 0
      return multipleTabStore.height
    }

    const getFooterHeight = () => {
      if (sporadicSettingStore.hiddenFooter) return 0
      return sporadicSettingStore.footerHeight
    }

    return {
      '--aside-width': `${getAsideWidth()}px`,
      '--header-height': `${getHeaderHeight()}px`,
      '--tab-bar-height': `${getTabBarHeight()}px`,
      '--footer-height': `${getFooterHeight()}px`,
    }
  })

  return {
    getLayoutStyles,
  }
}
