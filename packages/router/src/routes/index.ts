import type { RouteRecordItem } from '@vben/types'
import {
  LOGIN_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
  REDIRECT_ROUTE,
  ROOT_ROUTE,
  LOCK_SCREEN_ROUTE,
} from './basic'

export * from './basic'

const routeModuleRecord = import.meta.globEager('./modules/**/*.ts') as any

const routeModules: RouteRecordItem[] = []

Object.keys(routeModuleRecord).forEach((key) => {
  const routeModule = routeModuleRecord[key].default || {}
  routeModules.push(
    ...(Array.isArray(routeModule) ? [...routeModule] : [routeModule]),
  )
})

export const layoutRoutes = [...routeModules]

export const BasicRoutes = [
  LOGIN_ROUTE,
  LOCK_SCREEN_ROUTE,
  ROOT_ROUTE,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
]
