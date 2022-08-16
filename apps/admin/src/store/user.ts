import type { UserInfo, ErrorMessageMode, RoleInfo } from '@vben/types'
import type { UserInfoModel, LoginParams } from '@/apis/auth'
import { defineStore } from 'pinia'
import { BASIC_HOME_PATH, BASIC_LOGIN_PATH } from '@vben/constants'
import { pinia } from '@/pinia'
import { router } from '@/router'
import { doLogoutApi, getUserInfoApi, doLoginApi } from '@/apis/auth'

interface UserState {
  userInfo?: UserInfo
  accessToken?: string
  roles: RoleInfo[]
}

export const useUserStore = defineStore({
  id: 'app-user-store',
  persist: {
    strategies: [{ paths: ['userInfo', 'accessToken', 'roles'] }],
  },
  state: (): UserState => ({
    userInfo: undefined,
    accessToken: undefined,
    roles: [],
  }),
  getters: {
    getUserInfo(): UserInfo | undefined {
      return this.userInfo
    },
    getAccessToken(): string | undefined {
      return this.accessToken
    },
    getRoles(): RoleInfo[] {
      return this.roles.length > 0 ? this.roles : []
    },
  },
  actions: {
    setAccessToken(info: string | undefined) {
      this.accessToken = info ? info : ''
    },
    setRoles(roles: RoleInfo[]) {
      this.roles = roles
    },
    resetState() {
      this.userInfo = undefined
      this.accessToken = undefined
      this.roles = []
    },

    async login(
      params: LoginParams & {
        goHome?: boolean
        mode?: ErrorMessageMode
      },
    ): Promise<UserInfoModel | null> {
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

    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getAccessToken) {
        return null
      }

      const userInfo = await getUserInfoApi()
      const { roles = [] } = userInfo
      this.setRoles(roles)

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
      if (goLogin) {
        router.push(BASIC_LOGIN_PATH)
      }
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWithout() {
  return useUserStore(pinia)
}
