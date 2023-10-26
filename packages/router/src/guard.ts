import nProgress from 'nprogress'

import {
  stores,
  getPermissionMode,
  isBackMode,
  isRouteMappingMode,
  router,
} from './index'

import type { Menu } from '@vben/types'
import {
  BASIC_LOCK_PATH,
  BASIC_LOGIN_PATH,
  PageEnum,
  PermissionModeEnum,
} from '@vben/constants'
import { PAGE_NOT_FOUND_ROUTE, ROOT_ROUTE } from './routes'
import { configureDynamicParamsMenu } from './helper'

const LOADED_PAGE_POOL = new Map<string, boolean>()
const LOCK_PATH = BASIC_LOCK_PATH
const LOGIN_PATH = BASIC_LOGIN_PATH
const whitePathList: string[] = [LOGIN_PATH, LOCK_PATH]
const ROOT_PATH = ROOT_ROUTE.path

// 创建基础路由守卫
// 加载页面进度条
export function createBasicGuard() {
  const openNProgress = stores.appConfig?.transition?.openNProgress
  router.beforeEach((to) => {
    // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
    to.meta.loaded = !!LOADED_PAGE_POOL.get(to.path)
    // Display a progress bar at the top when switching pages
    // Only works when the page is loaded for the first time
    if (openNProgress && !to.meta.loaded) {
      nProgress.start()
    }
    return true
  })
  router.afterEach((to) => {
    // Indicates that the page has been loaded
    // When opening again, you can turn off some progress display interactions
    LOADED_PAGE_POOL.set(to.path, true)
    // console.log(to)
    // Close the page loading progress bar
    if (openNProgress && !to.meta.loaded) {
      nProgress.done()
    }
  })
}

//创建权限路由守卫

export function createAuthGuard() {
  const { userStore, authStore, lockStore } = stores
  router.beforeEach(async (to, from, next) => {
    if (
      from.path === ROOT_PATH &&
      to.path === PageEnum.BASE_HOME &&
      userStore.getUserInfo?.homePath &&
      userStore.getUserInfo?.homePath !== PageEnum.BASE_HOME
    ) {
      next(userStore.getUserInfo?.homePath)
      return
    }

    const token = userStore.getAccessToken

    // TODO Whitelist can be directly entered
    if (whitePathList.includes(to.path as PageEnum)) {
      if (to.path === LOGIN_PATH && token) {
        const isSessionTimeout = userStore.getSessionTimeout
        try {
          await userStore.afterLoginAction()
          if (!isSessionTimeout) {
            next((to.query?.redirect as string) || '/')
            return
          }
        } catch {}
      }
      if (to.path === LOCK_PATH && !lockStore.getLockInfo?.isLock) {
        next({ path: from.path })
        return
      }
      next()
      return
    }
    // token does not exist
    if (!token) {
      // You can access without permission. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next()
        return
      }

      // redirect login page
      const redirectData: {
        path: string
        replace: boolean
        query?: Recordable<string>
      } = {
        path: LOGIN_PATH,
        replace: true,
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        }
      }

      next(redirectData)
      return
    }

    if (lockStore.getLockInfo?.isLock) {
      // redirect lock page
      const redirectData: {
        path: string
        replace: boolean
        query?: Recordable<string>
      } = {
        path: LOCK_PATH,
        replace: true,
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        }
      }
      next(redirectData)
      return
    }

    // Jump to the 404 page after processing the login
    if (
      from.path === LOGIN_PATH &&
      to.name === PAGE_NOT_FOUND_ROUTE.name &&
      to.fullPath !== (userStore.getUserInfo?.homePath || PageEnum.BASE_HOME)
    ) {
      next(userStore.getUserInfo?.homePath || PageEnum.BASE_HOME)
      return
    }
    const permissionMode = getPermissionMode()
    // TODO get userinfo while last fetch time is empty
    if (
      userStore.getLastUpdateTime === 0 &&
      permissionMode == PermissionModeEnum.BACK
    ) {
      try {
        await userStore.getUserInfoAction()
      } catch (err) {
        next()
        return
      }
    }
    if (authStore.getIsDynamicAddedRoute) {
      next()
      return
    }

    // console.log(to.params)
    const routes = await authStore.buildRoutesAction()

    routes.forEach((route) => {
      router.addRoute(route)
    })

    router.addRoute(PAGE_NOT_FOUND_ROUTE)

    authStore.setDynamicAddedRoute(true)

    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query })
    } else {
      const redirectPath = (from.query.redirect || to.path) as string
      const redirect = decodeURIComponent(redirectPath)
      const nextData =
        to.path === redirect ? { ...to, replace: true } : { path: redirect }
      next(nextData)
    }
  })
}

// 标签路由守卫：进入路由，增加Tabs
export function createTabsGuard(func: Function) {
  router.beforeEach(async (to) => {
    if (whitePathList.includes(to.path)) return
    // Notify routing changes
    func(to)
  })
}

export function createParamMenuGuard() {
  const { authStore } = stores
  router.beforeEach(async (to, _, next) => {
    // filter no name route
    if (!to.name) {
      next()
      return
    }

    // menu has been built.
    if (!authStore.getIsDynamicAddedRoute) {
      next()
      return
    }
    let menus: Menu[] = []
    if (isBackMode()) {
      menus = authStore.getBackMenuList
    } else if (isRouteMappingMode()) {
      menus = authStore.getFrontMenuList
    }
    menus.forEach((item) => configureDynamicParamsMenu(item, to.params))
    next()
  })
}
