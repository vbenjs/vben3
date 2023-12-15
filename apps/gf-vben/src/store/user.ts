import type { LoginParams } from '@/apis/auth'
import { defineStore } from '@vben/stores'
import { BASIC_HOME_PATH, BASIC_LOGIN_PATH, PageEnum } from '@vben/constants'
import { router } from '@/router'
import { doLogoutApi, getUserInfoApi, doLoginApi } from '@/apis/auth'
import { PAGE_NOT_FOUND_ROUTE } from '@vben/router'
import { useAuthStoreWithout } from './auth'
import { GetUserInfoModel } from '@/apis/sys/user'
import { UserInfo, RoleInfo, UserState } from '@vben/types'
import { ErrorMessageMode } from '@vben/types'
import { isArray } from '@vben/utils'

export const useUserStore = defineStore('app-user-store', {
  persist: {
    paths: ['userInfo', 'accessToken', 'roles'],
  },
  state: (): UserState => ({
    userInfo: null,
    accessToken: undefined,
    roles: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo | null {
      return this.userInfo
    },
    getAccessToken(): string | undefined {
      return this.accessToken
    },
    getRoles(): RoleInfo[] {
      return this.roles.length > 0 ? this.roles : []
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
  },
  actions: {
    setAccessToken(info: string | undefined) {
      this.accessToken = info ? info : ''
    },
    setRoles(roles: RoleInfo[]) {
      this.roles = roles
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag
    },
    resetState() {
      this.userInfo = null
      this.accessToken = undefined
      this.roles = []
      this.sessionTimeout = false
    },

    async login(
      params: LoginParams & {
        goHome?: boolean
        mode?: ErrorMessageMode
      },
    ): Promise<UserInfo | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params
        const { accessToken } = await doLoginApi(loginParams, mode)
        // save token
        this.setAccessToken(accessToken)
        if (!this.getAccessToken) {
          return null
        }
        const userInfo = await this.getUserInfoAction()
        if (goHome) {
          await router.replace(BASIC_HOME_PATH)
        }
        return userInfo
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getAccessToken) {
        return null
      }
      // get user info
      const userInfo = await this.getUserInfoAction()

      const sessionTimeout = this.sessionTimeout
      if (sessionTimeout) {
        this.setSessionTimeout(false)
      } else {
        const permissionStore = useAuthStoreWithout()
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction()
          routes.forEach((route) => {
            router.addRoute(route)
          })
          router.addRoute(PAGE_NOT_FOUND_ROUTE)
          permissionStore.setDynamicAddedRoute(true)
        }
        goHome &&
          (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME))
      }
      return userInfo
    },

    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getAccessToken) {
        return null
      }
      const userInfo = (await getUserInfoApi()) as unknown as UserInfo
      const { roles = [] } = userInfo
      if (isArray(roles)) {
        const roleList = roles.map(
          (item) => item.value,
        ) as unknown as RoleInfo[]
        this.setRoles(roleList)
      } else {
        userInfo.roles = []
        this.setRoles([])
      }
      this.setUserInfo(userInfo)

      return userInfo
    },

    async logout(goLogin = false) {
      if (this.getAccessToken) {
        try {
          await doLogoutApi()
        } catch (error: any) {
          console.log('logout error:' + error.toString())
        }
      }
      this.setAccessToken(undefined)
      this.setSessionTimeout(false)
      this.setUserInfo(null)
      if (goLogin) {
        router.push(BASIC_LOGIN_PATH)
      }
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWithout() {
  return useUserStore()
}
