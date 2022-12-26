import { VNode } from 'vue'
import { RouteLocationNormalized } from 'vue-router'

export interface ContextOptions {
  useRootSetting: () => unknown
  useAppStore: () => unknown
  useConfigStore: () => unknown
  useHeaderSetting: () => unknown
  useTabs: () => unknown
  useUserStore: () => unknown
  useAppInject: () => unknown
  useMenuSetting: () => unknown
  useMultipleTabStore: () => unknown
  useTransitionSetting: () => unknown
  useLockStore: () => unknown
  useLockScreen: () => unknown
  listenerRouteChange: (
    callback: (route: RouteLocationNormalized) => void,
    immediate?: boolean,
  ) => unknown
  usePromise: (fn: Function, config?: unknown) => unknown
  useDesign: (scope: string) => unknown
  getMenus: () => Promise<any>
  getCurrentParentPath: (currentPath: string) => Promise<any>
  getShallowMenus: () => Promise<any>
  getChildrenMenus: (parentPath: string) => Promise<any>
  getAllParentPath: (menu, path) => string[]
  Logo: VNode | null
}

export let context: ContextOptions = {
  useRootSetting: () => undefined,
  useAppStore: () => undefined,
  useConfigStore: () => undefined,
  useUserStore: () => undefined,
  useHeaderSetting: () => undefined,
  useMenuSetting: () => undefined,
  useTransitionSetting: () => undefined,
  useLockStore: () => undefined,
  useLockScreen: () => undefined,
  useAppInject: () => undefined,
  useMultipleTabStore: () => undefined,
  listenerRouteChange: (listenerRouteChange: (route) => void, immediate?) =>
    true,
  usePromise: (fn: Function, config) => undefined,
  useTabs: () => undefined,
  useDesign: (scope: string) => undefined,
  getMenus: async () => ({}),
  getCurrentParentPath: async (currentPath: string) => ({}),
  getShallowMenus: async () => ({}),
  getChildrenMenus: async (parentPath: string) => ({}),
  getAllParentPath: (menu, path) => [],
  Logo: null,
}

export const initLayout = async (func: AnyFunction<any>) => {
  context = func()
}
