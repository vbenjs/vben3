export interface ContextOptions {
  useRootSetting: () => unknown
  useAppStore: () => unknown
  useHeaderSetting: () => unknown
  useTabs: () => unknown
  useUserStore: () => unknown
  useAppInject: () => unknown
  useMultipleTabStore: () => unknown
  listenerRouteChange: (
    listenerRouteChange: () => undefined,
    immediate,
  ) => unknown
  usePromise: (fn: Function, config?: unknown) => unknown
  useDesign: (scope: string) => unknown
  getMenus: () => Promise<any>
  getAllParentPath: (menu, path) => string[]
}

export let context: ContextOptions = {
  useRootSetting: () => undefined,
  useAppStore: () => undefined,
  useUserStore: () => undefined,
  useHeaderSetting: () => undefined,
  useAppInject: () => undefined,
  useUserStore: () => undefined,
  useMultipleTabStore: () => undefined,
  listenerRouteChange: () => undefined,
  usePromise: (fn: Function, config) => undefined,
  useTabs: () => undefined,
  useDesign: (scope: string) => undefined,
  getMenus: async () => ({}),
  getAllParentPath: (menu, path) => [],
}

export const initLayout = async (func: AnyFunction<any>) => {
  context = func()
}
