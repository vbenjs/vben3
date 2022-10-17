import { VNode } from 'vue'

export interface ContextOptions {
  useRootSetting: () => unknown
  useAppStore: () => unknown
  useHeaderSetting: () => unknown
  useTabs: () => unknown
  useUserStore: () => unknown
  useAppInject: () => unknown
  useMenuSetting: () => unknown
  useMultipleTabStore: () => unknown
  listenerRouteChange: (
    listenerRouteChange: () => undefined,
    immediate,
  ) => unknown
  usePromise: (fn: Function, config?: unknown) => unknown
  useDesign: (scope: string) => unknown
  getMenus: () => Promise<any>
  getAllParentPath: (menu, path) => string[]
  Logo: VNode
}

export let context: ContextOptions = {
  useRootSetting: () => undefined,
  useAppStore: () => undefined,
  useUserStore: () => undefined,
  useHeaderSetting: () => undefined,
  useMenuSetting: () => undefined,
  useAppInject: () => undefined,
  useMultipleTabStore: () => undefined,
  listenerRouteChange: () => undefined,
  usePromise: (fn: Function, config) => undefined,
  useTabs: () => undefined,
  useDesign: (scope: string) => undefined,
  getMenus: async () => ({}),
  getAllParentPath: (menu, path) => [],
  Logo: null,
}

export const initLayout = async (func: AnyFunction<any>) => {
  context = func()
}
