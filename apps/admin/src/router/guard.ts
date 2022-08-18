import type { Router } from 'vue-router'
import nProgress from 'nprogress'
import { config } from '@/config'
import { BASIC_LOGIN_PATH, PageEnum } from '@vben/constants';
import { useUserStoreWithout } from '@/store/user'
import { useAuthStoreWithout } from '@/store/auth'
import { useMultipleTabWithOut } from '@/store/multipleTab'
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic'

const LOADED_PAGE_POOL = new Map<string, boolean>()
const LOGIN_PATH = BASIC_LOGIN_PATH
const whitePathList: string[] = [LOGIN_PATH]

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
  const authStore = useAuthStoreWithout()
  
  router.beforeEach(async (to, from, next) => {
  
    const token = userStore.getAccessToken
  
    // 可以直接进入的白名单
    if (whitePathList.includes(to.path as PageEnum)) {
      next();
      return;
    }
    
    // token does not exist
    if (!token) {
      // You can access without permission. You need to set the routing meta.ignoreAuth to true
      // Whitelist can be directly entered
      if (to.meta.ignoreAuth || whitePathList.includes(to.path)) {
        return true
      }
  
      const redirectData = {
        path: LOGIN_PATH,
        replace: true,
        // After logging in, jump to the previous page. If you don't need it, just delete the `query`
        query: { redirect: encodeURIComponent(to.fullPath) },
      }
      next(redirectData);
      // redirect login page
      return
    }
  
  
    // const routes = await authStore.generatorRoutes()
    // // console.log(111, routes)
    // // console.log(router.getRoutes())
    // routes.forEach((route) => {
    //   router.addRoute(route)
    // })
    // if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
    //   // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
    //   next({ path: to.fullPath, replace: true, query: to.query })
    //   return
    // }
    //
    // next()

    // if (permissionStore.getIsDynamicAddedRoute) {
    //   next()
    //   return
    // }

    // const routes = await permissionStore.buildRoutesAction()

    // routes.forEach((route) => {
    //   router.addRoute(route)
    // })

    // router.addRoute(PAGE_NOT_FOUND_ROUTE)

    // permissionStore.setDynamicAddedRoute(true)

    // if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
    //   // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
    //   next({ path: to.fullPath, replace: true, query: to.query })
    // } else {
    //   const redirectPath = (from.query.redirect || to.path) as string
    //   const redirect = decodeURIComponent(redirectPath)
    //   const nextData =
    //     to.path === redirect ? { ...to, replace: true } : { path: redirect }
    //   next(nextData)
    // }
  })
  // console.log(router.getRoutes(), 333)
}

// 路由守卫：进入路由，增加Tabs
export function createTabsGuard(router: Router) {
  const store = useMultipleTabWithOut()

  router.afterEach(async (to, from) => {
    if (whitePathList.includes(to.path)) return
    await store.checkTab(to)
  })
}

export { setupRouteGuard }
