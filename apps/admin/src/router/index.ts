import { createRouter, createWebHashHistory } from 'vue-router'
import { BasicRoutes } from '@vben/router'
import { asyncRoutes } from '@/router/routes'

export * from './menus'
export * from '@vben/router'

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

  getRouteNames(BasicRoutes)
})()

console.log(asyncRoutes)
// app router
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: BasicRoutes.concat(asyncRoutes),
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
