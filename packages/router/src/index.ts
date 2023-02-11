import { DefineAppConfigOptions } from '@vben/types'
import { PermissionModeEnum } from '@vben/constants'
import { useAppConfig } from '@vben/stores'
import { _assign } from '@vben/utils'
import { createRouter, createWebHashHistory, Router } from 'vue-router'
import { BasicRoutes } from './routes'
export * from './routes'
export * from './helper'
export * from './guard'
export * from './menus'

export interface Stores {
  userStore?: any
  lockStore?: any
  authStore?: any
  appConfig?: DefineAppConfigOptions
}

export let stores: Stores = {}
export let router: Router
export function InitRouter(path: string): Router {
  router = createRouter({
    history: createWebHashHistory(path),
    routes: BasicRoutes,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
  })
  return router
}

export function initGuard(s: Stores) {
  _assign(stores, s)
  stores.appConfig = useAppConfig()
}

export const getPermissionMode = () => {
  return stores.appConfig?.permissionMode
}

export const isBackMode = () => {
  return getPermissionMode() === PermissionModeEnum.BACK
}
export const isRouteMappingMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING
}
export const isRoleMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROLE
}
