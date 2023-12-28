import { loadRoutesFromModules } from '@vben/utils'
import { RouteRecordRaw } from 'vue-router'

const routeModuleRecord = import.meta.glob('./modules/**/*.ts', {
  eager: true,
}) as any
const routeModules: RouteRecordRaw[] = loadRoutesFromModules(routeModuleRecord)

export const asyncRoutes = [...routeModules]
