import type { RouteLocationNormalized, Router } from 'vue-router'

import { useRouter } from 'vue-router'
import { unref } from 'vue'
import { useMultipleTab, useAppConfig } from '@vben/stores'
import { TabActionEnum } from '@vben/constants'
import { useRedo } from '../usePage'

export function useTabs(_router?: Router) {
  const appStore = useAppConfig()

  function canIUseTabs(): boolean {
    const { show } = appStore.tabTar
    if (!show) {
      throw new Error(
        'The multi-tab page is currently not open, please open it in the settings！',
      )
    }
    return !!show
  }

  const tabStore = useMultipleTab()
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
    const currentTab = tab || getCurrentTab()
    switch (action) {
      case TabActionEnum.REFRESH_PAGE:
        await tabStore.refreshPage(router)
        const redo = useRedo(router)
        await redo()
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
        await tabStore.closeTab(currentTab, router)
        break
    }
  }

  return {
    refreshPage: () => handleTabAction(TabActionEnum.REFRESH_PAGE),
    closeAll: () => handleTabAction(TabActionEnum.CLOSE_ALL),
    closeLeft: (tab: RouteLocationNormalized) =>
      handleTabAction(TabActionEnum.CLOSE_LEFT, tab),
    closeRight: (tab: RouteLocationNormalized) =>
      handleTabAction(TabActionEnum.CLOSE_RIGHT, tab),
    closeOther: (tab: RouteLocationNormalized) =>
      handleTabAction(TabActionEnum.CLOSE_OTHER, tab),
    closeCurrent: () => handleTabAction(TabActionEnum.CLOSE_CURRENT),
    close: (tab: RouteLocationNormalized) =>
      handleTabAction(TabActionEnum.CLOSE, tab),
    setTitle: (title: string, tab?: RouteLocationNormalized) =>
      updateTabTitle(title, tab),
    updatePath: (fullPath: string, tab?: RouteLocationNormalized) =>
      updateTabPath(fullPath, tab),
  }
}
