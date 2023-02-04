import { useMenuSettingStore } from '../store/modules/menuSetting'
import { computed } from 'vue'

export const useComprehensive = () => {
  const menuSettingStore = useMenuSettingStore()
  const getLayoutStyles = computed(() => {
    let asideWidth = menuSettingStore.width

    if (menuSettingStore.isMixSidebar)
      asideWidth = menuSettingStore.mixSidebarWidth
    if (menuSettingStore.collapsed) asideWidth = menuSettingStore.collapsedWidth
    if (menuSettingStore.isTopMenu) asideWidth = 0

    return {
      '--aside-width': asideWidth + 'px',
    }
  })
  return {
    getLayoutStyles,
  }
}
