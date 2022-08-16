import {
  PAGE_NOT_FOUND_ROUTE,
  REDIRECT_ROUTE,
  LOGIN_ROUTE,
  ROOT_ROUTE,
} from './basic'
// modules
import dashboard from './dashboard'

const routeModules: RouteRecordItem[] = [dashboard]

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModules]

// Basic routing without permission
export const routes = [
  LOGIN_ROUTE,
  ROOT_ROUTE,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
]
