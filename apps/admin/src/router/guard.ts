import type { Router } from 'vue-router'
import nProgress from 'nprogress'
import { config } from '@/config'
import { BASIC_LOGIN_PATH, PageEnum } from '@vben/constants'
import { useUserStoreWithout } from '@/store/user'
import { useAuthStoreWithout } from '@/store/auth'
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic'
import { setRouteChange } from '@/logics/mitt/routeChange'
import { ROOT_ROUTE } from './routes'

const LOADED_PAGE_POOL = new Map<string, boolean>()
const LOGIN_PATH = BASIC_LOGIN_PATH
const whitePathList: string[] = [LOGIN_PATH]
const ROOT_PATH = ROOT_ROUTE.path

async function setupRouteGuard(router: Router) {
  const { enableProgress } = config
  router.beforeEach(async (to) => {
    // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
    to.meta.loaded = !!LOADED_PAGE_POOL.get(to.path)

    // Display a progress bar at the top when switching pages
    // Only works when the page is loaded for the first time
    if (enableProgress && !to.meta.loaded) {
      nProgress.start()
    }
    return true
  })

  router.afterEach((to) => {
    // Indicates that the page has been loaded
    // When opening again, you can turn off some progress display interactions
    LOADED_PAGE_POOL.set(to.path, true)

    // Close the page loading progress bar
    if (enableProgress && !to.meta.loaded) {
      nProgress.done()
    }
  })

  createAuthGuard(router)
  createTabsGuard(router)
}

export function createAuthGuard(router: Router) {
  const userStore = useUserStoreWithout()
  const permissionStore = useAuthStoreWithout()

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

      console.log(redirectData)

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

    // TODO get userinfo while last fetch time is empty
    if (userStore.getLastUpdateTime === 0) {
      try {
        await userStore.getUserInfoAction()
      } catch (err) {
        next()
        return
      }
    }

    if (permissionStore.getIsDynamicAddedRoute) {
      next()
      return
    }

    const routes = await permissionStore.buildRoutesAction()

    routes.forEach((route) => {
      router.addRoute(route)
    })

    router.addRoute(PAGE_NOT_FOUND_ROUTE)

    permissionStore.setDynamicAddedRoute(true)

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

// 路由守卫：进入路由，增加Tabs
export function createTabsGuard(router: Router) {
  router.beforeEach(async (to) => {
    if (whitePathList.includes(to.path)) return
    // Notify routing changes
    setRouteChange(to)
  })
}

export { setupRouteGuard }
