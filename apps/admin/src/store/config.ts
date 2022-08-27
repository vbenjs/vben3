import { pinia } from '@/pinia'
import { ProjectConfig } from '@/types'
import { defineStore } from 'pinia'

export interface ConfigStoreState {
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
        paths: [],
        // paths: ['projectConfig'],
      },
    ],
  },
  state: (): ConfigStoreState => ({
    pageLoading: false,
    projectConfig: {} as any,
  }),
  getters: {
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig)
    },
    getPageLoading(): boolean {
      return this.pageLoading
    },
  },
  actions: {
    async setPageLoadingAction(loading: boolean): Promise<void> {
      console.log(loading)
    },
  },
})

export function useAppStoreWithOut() {
  return useConfigStore(pinia)
}
