import { defineStore } from 'pinia'
import { pinia } from '@/pinia'
import { useUserStoreWithout } from '@/store/user'
import { config } from '@/config'
import { asyncRoutes } from '@/router/routes'
import { filterTree } from '@vben/utils'

interface AuthState {
  // Whether the route has been dynamically added
  isDynamicAddedRoute: boolean
  // To trigger a menu update
  lastBuildMenuTime: number
}

export const useAuthStore = defineStore({
  id: 'app-auth-store',
  state: (): AuthState => ({
    isDynamicAddedRoute: false,
    // To trigger a menu update
    lastBuildMenuTime: 0,
  }),
  getters: {
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    },
  },
  actions: {
    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime()
    },
    setAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    resetState(): void {
      this.isDynamicAddedRoute = false
      this.lastBuildMenuTime = 0
    },

    /**
     *
     * @returns Dynamically generate routes
     */
    async generatorRoutes(): Promise<RouteRecordItem[]> {
      let routes: RouteRecordItem[] = []
      const userStore = useUserStoreWithout()
      const { authType } = config

      switch (authType) {
        // that permissions are controlled by the front end
        case 'frontend':
          const userRoles = userStore.getRoles
          routes = filterTree(asyncRoutes, (route: RouteRecordItem) => {
            const { allowRoles } = route?.meta ?? {}
            if (!allowRoles) {
              return true
            }
            const roleValues = userRoles.map((role) => role.value)
            return roleValues.some((role) =>
              (allowRoles as string[]).includes(role),
            )
          })

          break

        // that the permissions are controlled by the backend
        case 'backend':
          break
      }
      return routes
    },
  },
})

// Need to be used outside the setup
export function useAuthStoreWithout() {
  return useAuthStore(pinia)
}
