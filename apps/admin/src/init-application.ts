import { initRequest } from '@vben/request'
import { useUserStoreWithout, useUserStore } from '@/store/user'
import { useI18n, useLocale } from '@vben/locale'
import { getGlobalConfig } from '@vben/utils'
import { useConfigStore } from '@/store/config'
import { projectSetting } from './setting'
import { initComp } from '@vben/vbencomponents'
import { initLayout } from '@vben/layouts'
import { localeList } from '@vben/locale/src/config'
import {
  useAppInject,
  useHeaderSetting,
  useMenuSetting,
  useMultipleTabSetting,
  useRootSetting,
  useTabs,
  useTransitionSetting,
  useDesign,
  useAppConfig,
  usePromise,
} from '@vben/hooks'
import {
  getAllParentPath,
  getChildrenMenus,
  getCurrentParentPath,
  getMenus,
  getShallowMenus,
  listenerRouteChange,
} from '@vben/router'
import { useMultipleTabStore } from '@/store/multipleTab'
import { useAppStore } from '@/store/modules/app'
import Logo from '@/layout/components/logo.vue'

import { useLockStore } from '@/store/lock'
import { useLockScreen } from '@/hooks/web/useLockScreen'
import { siteSetting } from '@/config'

// To decouple the modules below `packages/*`, they no longer depend on each other
// If the modules are heavily dependent on each other, you need to provide a decoupling method, and the caller will pass the parameters
// Each module needs to provide `bridge` file as a decoupling method

// 为了解耦 `packages/*` 下面各模块，不再相互依赖
// 如果模块相互依赖严重，则需要对外提供解耦方式，由调用方去进行参数传递
// 各个模块需要提供 `bridge` 文件作为解耦方式
async function initPackages() {
  const _initRequest = async () => {
    const { apiUrl } = getGlobalConfig(import.meta.env)
    const { t } = useI18n()
    await initRequest(() => {
      return {
        apiUrl,
        getTokenFunction: () => {
          const userStore = useUserStoreWithout()
          return userStore.getAccessToken
        },
        errorFunction: null,
        noticeFunction: null,
        errorModalFunction: null,
        timeoutFunction: () => {
          const userStore = useUserStoreWithout()
          userStore.setAccessToken(undefined)
          userStore.logout(true)
        },
        unauthorizedFunction: (msg?: string) => {
          const userStore = useUserStoreWithout()
          userStore.setAccessToken(undefined)
          userStore.logout(true)
          return msg || t('sys.api.errMsg401')
        },
        handleErrorFunction: (msg, mode) => {
          if (mode === 'modal') {
            Modal.error({ title: t('sys.api.errorTip'), content: msg })
          } else if (mode === 'message') {
            message.error(msg)
          }
        },
      }
    })
  }

  const _initComp = async () => {
    await initComp(() => {
      return {
        useLocale,
        localeList,
        useAppStore,
        useConfigStore,
      }
    })
  }
  const _initLayout = async () => {
    await initLayout(() => {
      return {
        useAppConfig,
        useRootSetting,
        getMenus,
        getCurrentParentPath,
        getShallowMenus,
        getChildrenMenus,
        getAllParentPath,
        useHeaderSetting,
        useDesign,
        useAppInject,
        useTabs,
        usePromise,
        useMultipleTabStore,
        listenerRouteChange,
        useUserStore,
        useAppStore,
        useConfigStore,
        Logo,
        useMenuSetting,
        useMultipleTabSetting,
        useTransitionSetting,
        useLockStore,
        useLockScreen,
        siteSetting,
      }
    })
  }

  await Promise.all([_initRequest(), _initComp(), _initLayout()])
}

// Initial project configuration
function initAppConfigStore() {
  // const configStore = useConfigStoreWithOut()
  // const projectConfig = unref(configStore.getProjectConfig)
  // const projCfg = deepMerge(projectSetting, projectConfig || {})
  // configStore.setProjectConfig(projCfg)
  const appConfig = useAppConfig()
  appConfig.setAppConfig(projectSetting)
}

export async function initApplication() {
  // ! Need to pay attention to the timing of execution
  // ! 需要注意调用时机
  await initPackages()

  // Initialize internal system configuration
  initAppConfigStore()
}
