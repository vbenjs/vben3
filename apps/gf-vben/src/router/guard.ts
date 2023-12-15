import { useUserStoreWithout } from '@/store/user'
import { useAuthStoreWithout } from '@/store/auth'
import {
  initGuard,
  createBasicGuard,
  createAuthGuard,
  createTabsGuard,
  createParamMenuGuard,
  setRouteChange,
} from '@vben/router'
import { useLockStore } from '@/store/lock'

// 设置路由守卫
async function setupRouteGuard() {
  const userStore = useUserStoreWithout()
  const lockStore = useLockStore()
  const authStore = useAuthStoreWithout()
  const stores = {
    userStore,
    lockStore,
    authStore,
  }
  // 初始化路由守卫
  initGuard(stores)
  // 创建基础路由守卫
  createBasicGuard()
  // 创建权限路由守卫
  createAuthGuard()
  // 创建标签路由守卫
  createTabsGuard(setRouteChange)
  // must after createPermissionGuard (menu has been built.)
  createParamMenuGuard()
}

export { setupRouteGuard }
