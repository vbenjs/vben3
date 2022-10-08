export interface ContextOptions {
  useRootSetting: () => unknown

  useHeaderSetting: () => unknown
  getMenus: () => Promise<any>
  getAllParentPath: (menu, path) => string[]
}

export let context: ContextOptions = {
  useRootSetting: () => undefined,
  useHeaderSetting: () => undefined,
  getMenus: async () => ({}),
  getAllParentPath: (menu, path) => [],
}

export const initLayout = async (func: AnyFunction<any>) => {
  context = func()
}
