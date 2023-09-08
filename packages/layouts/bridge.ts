import { VNode } from 'vue'
import { RouteLocationNormalized } from 'vue-router'
import {
  useRootSetting,
  useMenuSetting,
  useHeaderSetting,
  useMultipleTabSetting,
  useTransitionSetting,
} from '@vben/hooks'

export interface ContextOptions {
  useRootSetting: () => typeof useRootSetting
  useAppStore: () => unknown
  useConfigStore: () => unknown
  useHeaderSetting: () => typeof useHeaderSetting
  useTabs: () => unknown
  useUserStore: () => unknown
  useAppInject: () => unknown
  useMenuSetting: () => typeof useMenuSetting
  useMultipleTabSetting: () => typeof useMultipleTabSetting
  useMultipleTabStore: () => unknown
  useTransitionSetting: () => typeof useTransitionSetting
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
  siteSetting: Record<string, string>
  Logo: VNode | null
}

export let context: ContextOptions = {
  useRootSetting: () => useRootSetting,
  useAppStore: () => undefined,
  useConfigStore: () => undefined,
  useUserStore: () => undefined,
  useHeaderSetting: () => useHeaderSetting,
  useMenuSetting: () => useMenuSetting,
  useMultipleTabSetting: () => useMultipleTabSetting,
  useTransitionSetting: () => useTransitionSetting,
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
  siteSetting: {},
  Logo: null,
}

export const initLayout = async (func: AnyFunction<any>) => {
  context = func()
}
