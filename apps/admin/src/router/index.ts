import { createRouter, createWebHashHistory } from 'vue-router'
import { asyncRoutes, routes } from './routes'

// The whitelist should contain basic static routes
const WHITE_NAME_LIST: string[] = []
;(() => {
  const getRouteNames = (routeRecords: RouteRecordItem[]) =>
    routeRecords.forEach((item) => {
      WHITE_NAME_LIST.push(item.name)
      if (item?.children?.length) {
        getRouteNames(item.children)
      }
    })

  getRouteNames(routes)
})()

// app router
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}
//从路由获取菜单
export function getMenus(): RouteRecordItem[] {
  return asyncRoutes.filter((route) => {
    const { name } = route
    return !WHITE_NAME_LIST.includes(name as string)
  })
}
