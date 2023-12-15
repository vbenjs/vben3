import { defineStore } from 'pinia'
import { toRaw, unref } from 'vue'
import {
  PAGE_NOT_FOUND_NAME,
  PageEnum,
  REDIRECT_NAME,
  TabActionEnum,
} from '@vben/constants'
import type {
  RouteLocationNormalized,
  RouteLocationRaw,
  Router,
} from 'vue-router'
import { getRawRoute, RemovableRef } from '@vben/utils'
import { useRouter } from 'vue-router'

function handleGotoPage(router: Router, route?: RouteLocationNormalized) {
  const currentPath = unref(router.currentRoute).path
  // check if current route in tablist
  const isExist = useMultipleTab().getTabList.find(
    (item) => item.path === currentPath,
  )
  // if not in tablist, jump to target page or homepage
  if (!isExist) {
    const go = useGo(router)
    const targetPath = route?.path || PageEnum.BASE_HOME
    go(targetPath, true)
  }
}

export interface MultipleTabState {
  cacheTabList: Set<string>
  tabList: RouteLocationNormalized[] | RemovableRef<RouteLocationNormalized[]>
  lastDragEndIndex: number
}

const getToTarget = (tabItem: RouteLocationNormalized) => {
  const { params, path, query } = tabItem
  return {
    params: params || {},
    path,
    query: query || {},
  }
}

export function useGo(_router?: Router) {
  const { push, replace } = _router || useRouter()
  function go(opt: string, isReplace = false) {
    if (!opt) {
      return
    }
    isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError)
  }
  return go
}

function handleError(e: Error) {
  console.error(e)
}

export const useMultipleTab = defineStore({
  id: 'APP_MULTIPLE_TABS',
  state: (): MultipleTabState => ({
    // Tabs that need to be cached
    cacheTabList: new Set(),
    // multiple tab list
    tabList: [],
    // Index of the last moved tab
    lastDragEndIndex: 0,
  }),
  getters: {
    getTabList(): RouteLocationNormalized[] {
      return this.tabList
    },
    getCachedTabList(): string[] {
      return Array.from(this.cacheTabList)
    },
    getLastDragEndIndex(): number {
      return this.lastDragEndIndex
    },
  },
  actions: {
    /**
     * Update the cache according to the currently opened tabs
     */
    updateCacheTab() {
      const cacheMap: Set<string> = new Set()

      for (const tab of this.tabList) {
        const item = getRawRoute(tab)
        // Ignore the cache
        const needCache = !item.meta?.ignoreKeepAlive
        if (!needCache) {
          continue
        }
        const name = item.name as string
        cacheMap.add(name)
      }
      this.cacheTabList = cacheMap
    },

    /**
     * Refresh tabs
     */
    async refreshPage(router: Router) {
      const { currentRoute } = router
      const route = unref(currentRoute)
      const name = route.name

      const findTab = this.getCachedTabList.find((item) => item === name)
      if (findTab) {
        this.cacheTabList.delete(findTab)
      }
    },
    clearCacheTabs(): void {
      this.cacheTabList = new Set()
    },
    resetState(): void {
      this.tabList = []
      this.clearCacheTabs()
    },
    goToPage(router: Router) {
      const go = useGo(router)
      const len = this.tabList.length
      const { path } = unref(router.currentRoute)

      let toPath: PageEnum | string = PageEnum.BASE_HOME

      if (len > 0) {
        const page = this.tabList[len - 1]
        const p = page.fullPath || page.path
        if (p) {
          toPath = p
        }
      }
      // Jump to the current page and report an error
      path !== toPath && go(toPath, true)
    },
    async checkTab(route: RouteLocationNormalized) {
      // await router.isReady()

      const { path, name, meta } = getRawRoute(route)
      // 404  The page does not need to add a tab
      if (
        [PageEnum.ERROR_PAGE, PageEnum.BASE_LOGIN, PageEnum.BASE_LOCK].includes(
          path as PageEnum,
        ) ||
        meta?.hideTab ||
        !name ||
        [REDIRECT_NAME, PAGE_NOT_FOUND_NAME].includes(name as string)
      ) {
        return
      }
      await this.addTab(route)
    },
    async addTab(route: RouteLocationNormalized) {
      const { path, fullPath, params, query, meta } = getRawRoute(route)

      let updateIndex = -1
      // Existing pages, do not add tabs repeatedly
      const tabHasExits = this.tabList.some((tab, index) => {
        updateIndex = index
        return (tab.fullPath || tab.path) === (fullPath || path)
      })
      // If the tab already exists, perform the update operation
      if (tabHasExits) {
        const curTab = toRaw(this.tabList)[updateIndex]
        if (!curTab) {
          return
        }
        curTab.meta = meta || curTab.meta
        curTab.params = params || curTab.params
        curTab.query = query || curTab.query
        curTab.fullPath = fullPath || curTab.fullPath
        this.tabList.splice(updateIndex, 1, curTab)
      } else {
        // Add tab
        // 获取动态路由打开数，超过 0 即代表需要控制打开数
        const dynamicLevel = (meta?.dynamicLevel ?? -1) as unknown as number
        if (dynamicLevel > 0) {
          // 如果动态路由层级大于 0 了，那么就要限制该路由的打开数限制了
          // 首先获取到真实的路由，使用配置方式减少计算开销.
          // const realName: string = path.match(/(\S*)\//)![1];
          const realPath = meta?.realPath ?? ''
          // 获取到已经打开的动态路由数, 判断是否大于某一个值
          if (
            this.tabList.filter((e) => e.meta?.realPath ?? '' === realPath)
              .length >= dynamicLevel
          ) {
            // 关闭第一个
            const index = this.tabList.findIndex(
              (item) => item.meta.realPath === realPath,
            )
            index !== -1 && this.tabList.splice(index, 1)
          }
        }
        this.tabList.push(route)
      }
      this.updateCacheTab()
    },

    async closeTab(tab: RouteLocationNormalized, router: Router) {
      const close = (route: RouteLocationNormalized) => {
        // @ts-ignore
        const { fullPath, meta: { affix } = {} } = route
        if (affix) {
          return
        }
        const index = this.tabList.findIndex(
          (item) => item.fullPath === fullPath,
        )
        index !== -1 && this.tabList.splice(index, 1)
      }

      const { currentRoute, replace } = router

      const { path } = unref(currentRoute)
      if (path !== tab.path) {
        // Closed is not the activation tab
        close(tab)
        return
      }

      // Closed is activated atb
      let toTarget: RouteLocationRaw = {}

      const index = this.tabList.findIndex((item) => item.path === path)

      // If the current is the leftmost tab
      if (index === 0) {
        // There is only one tab, then jump to the homepage, otherwise jump to the right tab
        if (this.tabList.length === 1) {
          // const userStore = useUserStore()
          // toTarget = userStore.getUserInfo?.homePath || PageEnum.BASE_HOME
          toTarget = PageEnum.BASE_HOME
        } else {
          //  Jump to the right tab
          const page = this.tabList[index + 1]
          toTarget = getToTarget(page)
        }
      } else {
        // Close the current tab
        const page = this.tabList[index - 1]
        toTarget = getToTarget(page)
      }
      close(currentRoute.value)
      await replace(toTarget)
    },

    // Close according to key
    async closeTabByKey(key: string, router: Router) {
      const index = this.tabList.findIndex(
        (item) => (item.fullPath || item.path) === key,
      )
      if (index !== -1) {
        await this.closeTab(this.tabList[index], router)
        const { currentRoute, replace } = router
        // 检查当前路由是否存在于tabList中
        const isActivated = this.tabList.findIndex((item) => {
          return item.fullPath === currentRoute.value.fullPath
        })
        // 如果当前路由不存在于TabList中，尝试切换到其它路由
        if (isActivated === -1) {
          let pageIndex
          if (index > 0) {
            pageIndex = index - 1
          } else if (index < this.tabList.length - 1) {
            pageIndex = index + 1
          } else {
            pageIndex = -1
          }
          if (pageIndex >= 0) {
            const page = this.tabList[index - 1]
            const toTarget = getToTarget(page)
            await replace(toTarget)
          }
        }
      }
    },

    // Sort the tabs
    async sortTabs(oldIndex: number, newIndex: number) {
      const currentTab = this.tabList[oldIndex]
      this.tabList.splice(oldIndex, 1)
      this.tabList.splice(newIndex, 0, currentTab)
      this.lastDragEndIndex = this.lastDragEndIndex + 1
    },

    // Close the tab on the right and jump
    async closeLeftTabs(route: RouteLocationNormalized, router: Router) {
      const index = this.tabList.findIndex((item) => item.path === route.path)

      if (index > 0) {
        const leftTabs = this.tabList.slice(0, index)
        const pathList: string[] = []
        for (const item of leftTabs) {
          const affix = item?.meta?.affix ?? false
          if (!affix) {
            pathList.push(item.fullPath)
          }
        }
        this.bulkCloseTabs(pathList)
      }
      this.updateCacheTab()
      handleGotoPage(router, route)
    },

    // Close the tab on the left and jump
    async closeRightTabs(route: RouteLocationNormalized, router: Router) {
      const index = this.tabList.findIndex(
        (item) => item.fullPath === route.fullPath,
      )

      if (index >= 0 && index < this.tabList.length - 1) {
        const rightTabs = this.tabList.slice(index + 1, this.tabList.length)

        const pathList: string[] = []
        for (const item of rightTabs) {
          const affix = item?.meta?.affix ?? false
          if (!affix) {
            pathList.push(item.fullPath)
          }
        }
        this.bulkCloseTabs(pathList)
      }
      this.updateCacheTab()
      handleGotoPage(router, route)
    },

    async closeAllTab(router: Router) {
      this.tabList = this.tabList.filter((item) => item?.meta?.affix ?? false)
      this.clearCacheTabs()
      this.goToPage(router)
    },

    /**
     * Close other tabs
     */
    async closeOtherTabs(route: RouteLocationNormalized, router: Router) {
      const closePathList = this.tabList.map((item) => item.fullPath)

      const pathList: string[] = []

      for (const path of closePathList) {
        if (path !== route.fullPath) {
          const closeItem = this.tabList.find((item) => item.path === path)
          if (!closeItem) {
            continue
          }
          const affix = closeItem?.meta?.affix ?? false
          if (!affix) {
            pathList.push(closeItem.fullPath)
          }
        }
      }
      this.bulkCloseTabs(pathList)
      this.updateCacheTab()
      handleGotoPage(router, route)
    },

    /**
     * Close tabs in bulk
     */
    bulkCloseTabs(pathList: string[]) {
      this.tabList = this.tabList.filter(
        (item) => !pathList.includes(item.fullPath),
      )
    },

    /**
     * Set tab's title
     */
    async setTabTitle(title: string, route: RouteLocationNormalized) {
      const findTab = this.getTabList.find((item) => item === route)
      if (findTab) {
        findTab.meta.title = title
        this.updateCacheTab()
      }
    },
    /**
     * replace tab's path
     * **/
    async updateTabPath(fullPath: string, route: RouteLocationNormalized) {
      const findTab = this.getTabList.find((item) => item === route)
      if (findTab) {
        findTab.fullPath = fullPath
        findTab.path = fullPath
        this.updateCacheTab()
      }
    },
    getTabActions(tabItem: RouteLocationNormalized) {
      if (!tabItem) return
      const { meta } = tabItem
      const { currentRoute } = useRouter()
      const { path } = unref(currentRoute)

      const isCurItem = tabItem ? tabItem.path === path : false

      const index = this.getTabList.findIndex(
        (tab) => tab.path === tabItem.path,
      )
      // Refresh button
      const refreshDisabled = !isCurItem
      // Close left
      const closeLeftDisabled = index === 0

      const disabled = this.getTabList.length === 1

      // Close right
      const closeRightDisabled =
        index === this.getTabList.length - 1 && this.getLastDragEndIndex >= 0

      return [
        {
          label: 'layout.multipleTab.reload',
          key: TabActionEnum.REFRESH_PAGE,
          icon: 'ion:reload-sharp',
          disabled: refreshDisabled,
        },
        {
          label: 'layout.multipleTab.close',
          key: TabActionEnum.CLOSE_CURRENT,
          icon: 'clarity:close-line',
          disabled: !!meta?.affix || disabled,
        },
        {
          type: 'divider',
          key: 'divider1',
        },
        {
          icon: 'line-md:arrow-close-left',
          key: TabActionEnum.CLOSE_LEFT,
          label: 'layout.multipleTab.closeLeft',
          disabled: closeLeftDisabled,
        },
        {
          icon: 'line-md:arrow-close-right',
          key: TabActionEnum.CLOSE_RIGHT,
          label: 'layout.multipleTab.closeRight',
          disabled: closeRightDisabled,
        },
        {
          type: 'divider',
          key: 'divider2',
        },
        {
          icon: 'dashicons:align-center',
          key: TabActionEnum.CLOSE_OTHER,
          label: 'layout.multipleTab.closeOther',
          disabled,
        },
        {
          label: 'layout.multipleTab.closeAll',
          key: TabActionEnum.CLOSE_ALL,
          icon: 'clarity:minus-line',
          disabled,
        },
      ]
    },
  },
  persist: {
    paths: ['tabList'],
  },
})
