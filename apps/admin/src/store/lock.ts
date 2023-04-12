import type { LockInfo } from '@vben/types'
import { defineStore } from '@vben/stores'
import { useUserStore } from '@/store/user'

interface LockState {
  lockInfo: Nullable<LockInfo>
}

export const useLockStore = defineStore({
  id: 'app-lock',
  persist: {
    paths: ['lockInfo'],
  },
  state: (): LockState => ({
    lockInfo: {},
  }),
  getters: {
    getLockInfo(): Nullable<LockInfo> {
      return this.lockInfo
    },
  },
  actions: {
    setLockInfo(info: LockInfo) {
      this.lockInfo = Object.assign({}, this.lockInfo, info)
    },
    resetLockInfo() {
      this.lockInfo = null
    },
    async unLock(password?: string) {
      const userStore = useUserStore()
      if (this.lockInfo?.pwd === password) {
        this.resetLockInfo()
        return true
      }
      const tryLogin = async () => {
        try {
          const username = userStore.getUserInfo?.username ?? ''
          const res = await userStore.login({
            username,
            password: password!,
            goHome: false,
            mode: 'none',
          })
          if (res) {
            this.resetLockInfo()
          }
          return res
        } catch (error) {
          return false
        }
      }
      return await tryLogin()
    },
  },
})
