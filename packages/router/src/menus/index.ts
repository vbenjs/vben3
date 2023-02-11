import type { RouteRecordNormalized } from 'vue-router'
import { stores, isBackMode, isRoleMode, router } from '../index'
import { getAllParentPath } from '../helper'
import { isUrl, filterTree } from '@vben/utils'

import { pathToRegexp } from 'path-to-regexp'
import { Menu } from '@vben/types'

// ===========================
// ==========Helper===========
// ===========================

async function getAsyncMenus() {
  const authStore = stores.authStore
  if (isBackMode()) {
    return authStore.getBackMenuList.filter(
      (item) => !item.meta?.hideMenu && !item.hideMenu,
    )
  }
  return authStore.getFrontMenuList.filter(
    (item) => !item.hideMenu && !item.meta?.hideMenu,
  )
}

export const getMenus = async (): Promise<Menu[]> => {
  const menus = await getAsyncMenus()
  if (isRoleMode()) {
    const routes = router.getRoutes()
    return filterTree(menus, basicFilter(routes))
  }
  return menus
}

export async function getCurrentParentPath(currentPath: string) {
  const menus = await getAsyncMenus()
  const allParentPath = await getAllParentPath(menus, currentPath)
  return allParentPath?.[0]
}

// Get the level 1 menu, delete children
export async function getShallowMenus(): Promise<Menu[]> {
  const menus = await getAsyncMenus()
  const shallowMenuList = menus.map((item) => ({
    ...item,
    children: undefined,
  }))
  if (isRoleMode()) {
    const routes = router.getRoutes()
    return shallowMenuList.filter(basicFilter(routes))
  }
  return shallowMenuList
}

// Get the children of the menu
export async function getChildrenMenus(parentPath: string) {
  const menus = await getMenus()
  const parent = menus.find((item) => item.path === parentPath)
  if (!parent || !parent.children || !!parent?.meta?.hideChildrenInMenu) {
    return [] as Menu[]
  }
  if (isRoleMode()) {
    const routes = router.getRoutes()
    return filterTree(parent.children, basicFilter(routes))
  }
  return parent.children
}

function basicFilter(routes: RouteRecordNormalized[]) {
  return (menu: Menu) => {
    const matchRoute = routes.find((route) => {
      if (isUrl(menu.path)) return true

      if (route.meta?.carryParam) {
        return pathToRegexp(route.path).test(menu.path)
      }
      const isSame = route.path === menu.path
      if (!isSame) return false

      if (route.meta?.ignoreAuth) return true

      return isSame || pathToRegexp(route.path).test(menu.path)
    })

    if (!matchRoute) return false
    menu.icon = (menu.icon || matchRoute.meta.icon) as string
    menu.meta = matchRoute.meta
    return true
  }
}
