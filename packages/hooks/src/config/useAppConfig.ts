import {
  useAppConfig as appConfigStore,
  storeToRefs,
  StoreGeneric,
} from '@vben/stores'
import { DefineAppConfigOptions, SidebarConfigOptions } from '@vben/types'
import { _merge } from '@vben/utils'

export const useAppConfig = () => {
  const useAppConfigStore = appConfigStore()
  const appConfigOptions = storeToRefs(
    useAppConfigStore as StoreGeneric,
  ) as unknown as DefineAppConfigOptions
  const setAppConfig = (configs: Partial<DefineAppConfigOptions>) => {
    useAppConfigStore.$patch((state) => {
      _merge(state, configs)
    })
  }

  const setSidebar = (sidebarConfigs: Partial<SidebarConfigOptions>) => {
    useAppConfigStore.setSidebar(sidebarConfigs)
  }

  return {
    setAppConfig,
    setSidebar,
    ...appConfigOptions,
  }
}
