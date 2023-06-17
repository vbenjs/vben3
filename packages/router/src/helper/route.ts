import type { RouteMeta, Router, RouteRecordNormalized } from 'vue-router'
import { Exception, FrameBlank } from '../page'
import { omit, cloneDeep } from '@vben/utils'
import { createRouter, createWebHashHistory } from 'vue-router'
import { LAYOUT, PARENT_LAYOUT } from '../routes'

export type LayoutMapKey = 'LAYOUT'

// const IFRAME = () => import('@/pages/sys/iframe/FrameBlank.vue')
// export const EXCEPTION_COMPONENT = () =>
//   import('@/pages/sys/exception/index.vue')
// @ts-ignore
const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>()

LayoutMap.set('LAYOUT', LAYOUT)
LayoutMap.set('IFRAME', FrameBlank)

let dynamicViewsModules: Record<string, () => Promise<Recordable<any>>>

// Dynamic introduction
function asyncImportRoute(routes: RouteRecordItem[] | undefined) {
  dynamicViewsModules =
    // @ts-ignore
    dynamicViewsModules || import.meta.glob('@/pages/**/*.{vue,tsx}')

  if (!routes) return
  routes.forEach((item: any) => {
    if (!item.component && item.meta?.frameSrc) {
      item.component = 'IFRAME'
    }
    const { component, name } = item
    const { children } = item

    if (component) {
      const layoutFound = LayoutMap.get(component.toUpperCase())
      if (layoutFound) {
        item.component = layoutFound
      } else {
        item.component = dynamicImport(dynamicViewsModules, component as string)
      }
    } else if (name) {
      item.component = PARENT_LAYOUT()
    }
    children && asyncImportRoute(children)
  })
}

function dynamicImport(
  dynamicViewsModules: Record<string, () => Promise<Recordable<any>>>,
  component: string,
) {
  const keys = Object.keys(dynamicViewsModules)
  const matchKeys = keys.filter((key) => {
    const k = key.replace('/src', '')
    const startFlag = component.startsWith('/')
    const endFlag = component.endsWith('.vue') || component.endsWith('.tsx')
    const startIndex = startFlag ? 0 : 1
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.')
    return k.substring(startIndex, lastIndex) === component
  })
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0]
    return dynamicViewsModules[matchKey]
  } else if (matchKeys?.length > 1) {
    console.warn(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure',
    )
    return
  } else {
    console.warn(
      '在/src/pages/下找不到`' +
        component +
        '.vue` 或 `' +
        component +
        '.tsx`, 请自行创建!',
    )
    return Exception
  }
}

// Turn background objects into routing objects
export function transformObjToRoute<T = RouteRecordItem>(
  routeList: RouteRecordItem[],
): T[] {
  routeList.forEach((route) => {
    const _route: any = route
    const component = _route.component as string
    console.log(component)
    if (component) {
      if (component.toUpperCase() === 'LAYOUT') {
        route.component = LayoutMap.get(component.toUpperCase())
      } else {
        route.children = [cloneDeep(route)]
        route.component = LAYOUT
        route.name = `${_route.name}Parent`
        route.path = ''
        const meta = route.meta || ({} as RouteMeta)
        meta.single = true
        meta.affix = false
        route.meta = meta
      }
    } else {
      console.warn('请正确配置路由：' + _route?.name + '的component属性')
    }
    route.children && asyncImportRoute(route.children)
  })
  return routeList as unknown as T[]
}

/**
 * Convert multi-level routing to level 2 routing
 */
export function flatMultiLevelRoutes(routeModules: RouteRecordItem[]) {
  const modules: RouteRecordItem[] = cloneDeep(routeModules)
  for (let index = 0; index < modules.length; index++) {
    const routeModule = modules[index]
    if (!isMultipleRoute(routeModule)) {
      continue
    }
    promoteRouteLevel(routeModule)
  }
  return modules
}

// Routing level upgrade
function promoteRouteLevel(routeModule: RouteRecordItem) {
  // Use vue-router to splice menus
  let router: Router | null = createRouter({
    routes: [routeModule as unknown as RouteRecordNormalized],
    history: createWebHashHistory(),
  })

  const routes = router.getRoutes()
  addToChildren(routes, routeModule.children || [], routeModule)
  router = null
  routeModule.children = routeModule.children?.map((item): any =>
    omit(item, 'children'),
  )
}

// Add all sub-routes to the secondary route
function addToChildren(
  routes: RouteRecordNormalized[],
  children: RouteRecordItem[],
  routeModule: RouteRecordItem,
) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    const route = routes.find((item) => item.name === child.name)
    if (!route) {
      continue
    }
    routeModule.children = routeModule.children || []
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children?.push(route as unknown as RouteRecordItem)
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule)
    }
  }
}

// Determine whether the level exceeds 2 levels
function isMultipleRoute(routeModule: RouteRecordItem) {
  if (
    !routeModule ||
    !Reflect.has(routeModule, 'children') ||
    !routeModule.children?.length
  ) {
    return false
  }

  const children = routeModule.children

  let flag = false
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    if (child.children?.length) {
      flag = true
      break
    }
  }
  return flag
}
