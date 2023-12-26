import {
  LOGIN_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
  REDIRECT_ROUTE,
  ROOT_ROUTE,
  LOCK_SCREEN_ROUTE,
} from './basic'
import { RouteRecordRaw } from 'vue-router'
import { loadRoutesFromModules } from '@vben/utils'

export * from './basic'

const routeModuleRecord = import.meta.glob('./modules/**/*.ts', {
  eager: true,
}) as any
const routeModules: RouteRecordRaw[] = loadRoutesFromModules(routeModuleRecord)

export const layoutRoutes = [...routeModules]

export function getTemplateRoutes(demo: boolean = true): RouteRecordRaw[] {
  return layoutRoutes.filter((v) => {
    if (demo) {
      return true
    }
    return !v.path.includes('demo')
  })
}

export const BasicRoutes = [
  LOGIN_ROUTE,
  LOCK_SCREEN_ROUTE,
  ROOT_ROUTE,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
]
