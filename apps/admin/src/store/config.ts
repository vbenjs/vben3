import { defineStore } from 'pinia'

export interface ConfigStoreState {
  // Page loading status
  pageLoading: boolean
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
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading
    },
  },
  actions: {
    async setPageLoadingAction(loading: boolean): Promise<void> {},
  },
})
