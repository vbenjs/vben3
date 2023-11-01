import { DefineComponent } from 'vue'
import { RouteLocationNormalized } from 'vue-router'
import {
  useRootSetting,
  useMenuSetting,
  useHeaderSetting,
  useMultipleTabSetting,
  useTransitionSetting,
  useTabs,
  useDesign,
  useAppConfig,
  usePromise,
} from '@vben/hooks'

type LogoComponent = DefineComponent<{
  showTitle?: boolean
}>
export interface ContextOptions {
  useAppConfig: typeof useAppConfig
  useRootSetting: typeof useRootSetting
  useAppStore: () => unknown
  useHeaderSetting: typeof useHeaderSetting
  useTabs: typeof useTabs
  useUserStore: () => unknown
  useAppInject: () => unknown
  useMenuSetting: typeof useMenuSetting
  useMultipleTabSetting: typeof useMultipleTabSetting
  useMultipleTabStore: () => unknown
  useTransitionSetting: typeof useTransitionSetting
  useLockStore: () => unknown
  useLockScreen: () => unknown
  listenerRouteChange: (
    callback: (route: RouteLocationNormalized) => void,
    immediate?: boolean,
  ) => unknown
  usePromise: typeof usePromise
  useDesign: typeof useDesign
  getMenus: () => Promise<any>
  getCurrentParentPath: (currentPath: string) => Promise<any>
  getShallowMenus: () => Promise<any>
  getChildrenMenus: (parentPath: string) => Promise<any>
  getAllParentPath: (menu, path) => string[]
  siteSetting: Record<string, string>
  Logo: Nullable<LogoComponent>
}

export let context: ContextOptions = {
  useAppConfig,
  useRootSetting,
  useAppStore: () => undefined,
  useUserStore: () => undefined,
  useHeaderSetting,
  useMenuSetting,
  useMultipleTabSetting,
  useTransitionSetting,
  useLockStore: () => undefined,
  useLockScreen: () => undefined,
  useAppInject: () => undefined,
  useMultipleTabStore: () => undefined,
  listenerRouteChange: (listenerRouteChange: (route) => void, immediate?) =>
    true,
  useTabs,
  usePromise,
  useDesign: useDesign,
  getMenus: async () => ({}),
  getCurrentParentPath: async (currentPath: string) => ({}),
  getShallowMenus: async () => ({}),
  getChildrenMenus: async (parentPath: string) => ({}),
  getAllParentPath: (menu, path) => [],
  siteSetting: {},
  Logo: null,
}

//TODO 需要区分哪些是必填的，其余的为选填
export const initLayout = (params: Partial<ContextOptions>) => {
  context = { ...context, ...params }
}
