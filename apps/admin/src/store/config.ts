import {
  BeforeMiniState,
  HeaderSetting,
  MenuSetting,
  MultiTabsSetting,
  ProjectConfig,
  TransitionSetting,
} from '@vben/types'
import { defineStore } from '@vben/stores'
import { deepMerge } from '@vben/utils'
import { APP_DARK_MODE_KEY_, ThemeEnum } from '@vben/constants'
import { darkMode, projectSetting } from '@/setting'

export interface ConfigStoreState {
  darkMode?: ThemeEnum
  // Page loading status
  pageLoading: boolean
  // project config
  projectConfig: ProjectConfig | null
  // When the window shrinks, remember some states, and restore these states when the window is restored
  beforeMiniInfo: BeforeMiniState
}

export const useConfigStore = defineStore({
  id: 'app-config-store',
  persist: {
    paths: ['darkMode', 'projectConfig'],
  },
  state: (): ConfigStoreState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: {} as any,
    beforeMiniInfo: {},
  }),
  getters: {
    getDarkMode(): ThemeEnum {
      return (
        this.darkMode ||
        (localStorage.getItem(APP_DARK_MODE_KEY_) as ThemeEnum) ||
        darkMode
      )
    },
    getBeforeMiniInfo(): BeforeMiniState {
      return this.beforeMiniInfo
    },
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig)
    },
    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting
    },
    getMultiTabsSetting(): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting
    },
    getPageLoading(): boolean {
      return this.pageLoading
    },
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting
    },
  },
  actions: {
    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state
    },
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config)
    },
    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode
      localStorage.setItem(APP_DARK_MODE_KEY_, mode)
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      console.log(loading)
    },
    resetProjectConfig() {
      this.setProjectConfig(projectSetting)
    },
  },
})

export function useConfigStoreWithOut() {
  return useConfigStore()
}
