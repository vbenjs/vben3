import type { RouteLocationNormalized, Router } from 'vue-router'

import { useRouter } from 'vue-router'
import { unref } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useMultipleTabStore } from '@/store/multipleTab'
import { TabActionEnum } from '@vben/constants'

export function useTabs(_router?: Router) {
  const appStore = useAppStore()

  function canIUseTabs(): boolean {
    const { show } = appStore.getMultiTabsSetting
    if (!show) {
      throw new Error(
        'The multi-tab page is currently not open, please open it in the settings！',
      )
    }
    return !!show
  }

  const tabStore = useMultipleTabStore()
  const router = _router || useRouter()

  const { currentRoute } = router

  function getCurrentTab() {
    const route = unref(currentRoute)

    return tabStore.getTabList.find((item) => item.fullPath === route.fullPath)!
  }

  async function updateTabTitle(title: string, tab?: RouteLocationNormalized) {
    const canIUse = canIUseTabs
    if (!canIUse) {
      return
    }
    const targetTab = tab || getCurrentTab()
    await tabStore.setTabTitle(title, targetTab)
  }

  async function updateTabPath(path: string, tab?: RouteLocationNormalized) {
    const canIUse = canIUseTabs
    if (!canIUse) {
      return
    }
    const targetTab = tab || getCurrentTab()
    await tabStore.updateTabPath(path, targetTab)
  }

  async function handleTabAction(
    action: TabActionEnum,
    tab?: RouteLocationNormalized,
  ) {
    const canIUse = canIUseTabs
    if (!canIUse) {
      return
    }
    const currentTab = getCurrentTab()
    switch (action) {
      case TabActionEnum.REFRESH_PAGE:
        await tabStore.refreshPage(router)
        break

      case TabActionEnum.CLOSE_ALL:
        await tabStore.closeAllTab(router)
        break

      case TabActionEnum.CLOSE_LEFT:
        await tabStore.closeLeftTabs(currentTab, router)
        break

      case TabActionEnum.CLOSE_RIGHT:
        await tabStore.closeRightTabs(currentTab, router)
        break

      case TabActionEnum.CLOSE_OTHER:
        await tabStore.closeOtherTabs(currentTab, router)
        break

      case TabActionEnum.CLOSE_CURRENT:
      case TabActionEnum.CLOSE:
        await tabStore.closeTab(tab || currentTab, router)
        break
    }
  }

  return {
    refreshPage: () => handleTabAction(TabActionEnum.REFRESH_PAGE),
    closeAll: () => handleTabAction(TabActionEnum.CLOSE_ALL),
    closeLeft: () => handleTabAction(TabActionEnum.CLOSE_LEFT),
    closeRight: () => handleTabAction(TabActionEnum.CLOSE_RIGHT),
    closeOther: () => handleTabAction(TabActionEnum.CLOSE_OTHER),
    closeCurrent: () => handleTabAction(TabActionEnum.CLOSE_CURRENT),
    close: (tab?: RouteLocationNormalized) =>
      handleTabAction(TabActionEnum.CLOSE, tab),
    setTitle: (title: string, tab?: RouteLocationNormalized) =>
      updateTabTitle(title, tab),
    updatePath: (fullPath: string, tab?: RouteLocationNormalized) =>
      updateTabPath(fullPath, tab),
  }
}
