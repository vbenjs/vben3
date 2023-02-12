import { defineStore } from 'pinia'
// import { pinia } from '@/pinia'
import { resetRouter } from '@vben/router'

interface AppState {
  pageLoading: boolean
}
let timeId: TimeoutHandle
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    pageLoading: false,
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading
    },
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
  return useAppStore()
}
