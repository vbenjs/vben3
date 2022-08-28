import { pinia } from '@/pinia'
import {
  HeaderSetting,
  MenuSetting,
  MultiTabsSetting,
  ProjectConfig,
} from '@/types'
import { defineStore } from 'pinia'
import { deepMerge } from '@vben/utils'
import { ThemeEnum } from '@/constants'
import { darkMode } from '@/settng'

export interface ConfigStoreState {
  darkMode?: ThemeEnum
  // Page loading status
  pageLoading: boolean
  // project config
  projectConfig: ProjectConfig | null
}

export const useConfigStore = defineStore({
  id: 'app-config-store',
  persist: {
    strategies: [
      {
        paths: ['darkMode', 'projectConfig'],
      },
    ],
  },
  state: (): ConfigStoreState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: {} as any,
  }),
  getters: {
    getDarkMode(): 'light' | 'dark' | string {
      return this.darkMode || darkMode
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
  },
  actions: {
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config)
    },
    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      console.log(loading)
    },
  },
})

export function useAppStoreWithOut() {
  return useConfigStore(pinia)
}
