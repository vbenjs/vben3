export interface ContextOptions {
  useRootSetting: () => unknown
  useHeaderSetting: () => unknown
  useAppInject: () => unknown
  useDesign: (scope: string) => unknown
  getMenus: () => Promise<any>
  getAllParentPath: (menu, path) => string[]
}

export let context: ContextOptions = {
  useRootSetting: () => undefined,
  useHeaderSetting: () => undefined,
  useAppInject: () => undefined,
  useDesign: (scope: string) => undefined,
  getMenus: async () => ({}),
  getAllParentPath: (menu, path) => [],
}

export const initLayout = async (func: AnyFunction<any>) => {
  context = func()
}
