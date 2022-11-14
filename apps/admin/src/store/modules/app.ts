import type { MultiTabsSetting } from '@vben/types'
// import type { BeforeMiniState } from '#/store';
import { defineStore } from 'pinia'

import { APP_DARK_MODE_KEY_, ThemeEnum } from '@vben/constants'
// import { Persistent } from '@/utils/cache/persistent';
// import { resetRouter } from '/@/router'
// import { deepMerge } from '/@/utils';
import { pinia } from '@/pinia'
import { resetRouter } from '@/router'

interface AppState {
  darkMode?: ThemeEnum
  // Page loading status
  pageLoading: boolean
  // project config
  // projectConfig: ProjectConfig | null;
  // When the window shrinks, remember some states, and restore these states when the window is restored
  // beforeMiniInfo: BeforeMiniState;
}
let timeId: TimeoutHandle
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    // projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
    // beforeMiniInfo: {},
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading
    },
    getDarkMode(): ThemeEnum {
      return (
        this.darkMode ||
        (localStorage.getItem(APP_DARK_MODE_KEY_) as ThemeEnum) ||
        ThemeEnum.LIGHT
      )
      // return this.darkMode
      //   ? this.darkMode
      //   : (localStorage.getItem(APP_DARK_MODE_KEY_) as ThemeEnum)
      // return 'dark'
    },

    // getBeforeMiniInfo(): BeforeMiniState {
    //   return this.beforeMiniInfo;
    // },

    // getProjectConfig(): ProjectConfig {
    //   return this.projectConfig || ({} as ProjectConfig);
    // },
    //
    // getHeaderSetting(): HeaderSetting {
    //   return this.getProjectConfig.headerSetting;
    // },
    // getMenuSetting(): MenuSetting {
    //   return this.getProjectConfig.menuSetting;
    // },
    // getTransitionSetting(): TransitionSetting {
    //   return this.getProjectConfig.transitionSetting;
    // },
    getMultiTabsSetting(): MultiTabsSetting {
      // return this.getProjectConfig.multiTabsSetting;
      return {} as MultiTabsSetting
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading
    },

    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode
      localStorage.setItem(APP_DARK_MODE_KEY_, mode)
    },

    // setBeforeMiniInfo(state: BeforeMiniState): void {
    //   this.beforeMiniInfo = state;
    // },

    // setProjectConfig(config: DeepPartial<ProjectConfig>): void {
    //   this.projectConfig = deepMerge(this.projectConfig || {}, config);
    //   Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    // },

    async resetAllState() {
      resetRouter()
      // Persistent.clearAll()
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId)
        // Prevent flicker
        timeId = setTimeout(() => {
          this.setPageLoading(loading)
        }, 50)
      } else {
        this.setPageLoading(loading)
        clearTimeout(timeId)
      }
    },
  },
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(pinia)
}
