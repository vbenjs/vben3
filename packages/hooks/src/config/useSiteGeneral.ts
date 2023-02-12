import {
  StoreGeneric,
  storeToRefs,
  useSiteGeneral as siteGeneralStore,
} from '@vben/stores'

import { _merge } from '@vben/utils'
import { DefineSiteGeneralOptions } from '@vben/types'

export const useSiteGeneral = () => {
  const useSiteGeneralStore = siteGeneralStore()
  const siteGeneral = storeToRefs(
    useSiteGeneralStore as StoreGeneric,
  ) as unknown as DefineSiteGeneralOptions
  const initSiteGeneralConfig = (
    configs: DeepPartial<DefineSiteGeneralOptions>,
  ) => {
    useSiteGeneralStore.$patch((state) => {
      _merge(state, configs)
    })
  }
  return {
    ...siteGeneral,
    initSiteGeneralConfig,
  }
}
