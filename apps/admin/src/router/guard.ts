import type { Router } from 'vue-router'
import { useUserStoreWithout } from '@/store/user'
import { useAuthStoreWithout } from '@/store/auth'
import {
  initGuard,
  createBasicGuard,
  createAuthGuard,
  createTabsGuard,
  createParamMenuGuard,
} from '@vben/router'
import { setRouteChange } from '@/logics/mitt/routeChange'
import { useLockStore } from '@/store/lock'

async function setupRouteGuard(router: Router) {
  const userStore = useUserStoreWithout()
  const permissionStore = useAuthStoreWithout()
  const lockStore = useLockStore()
  const authStore = useAuthStoreWithout()
  const stores = {
    userStore,
    permissionStore,
    lockStore,
    authStore,
  }
  initGuard(stores)
  createBasicGuard(router)
  createAuthGuard(router)
  createTabsGuard(router, setRouteChange)
  // must after createPermissionGuard (menu has been built.)
  createParamMenuGuard(router)
}

export { setupRouteGuard }
