import type { Router } from 'vue-router'
import nProgress from 'nprogress'
import { config } from '@/config'

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
import { useConfigStoreWithOut } from '@/store/config'
import { projectSetting } from '@/setting'
import { configureDynamicParamsMenu } from '@/router/helper'

async function setupRouteGuard(router: Router) {
  const userStore = useUserStoreWithout()
  const permissionStore = useAuthStoreWithout()
  const lockStore = useLockStore()
  const configStore = useConfigStoreWithOut()
  const authStore = useAuthStoreWithout()
  const stores = {
    userStore,
    permissionStore,
    lockStore,
    configStore,
    authStore,
  }
  initGuard(stores, projectSetting, config)
  createBasicGuard(router)
  createAuthGuard(router)
  createTabsGuard(router, setRouteChange)
  // must after createPermissionGuard (menu has been built.)
  createParamMenuGuard(router)
}

export { setupRouteGuard }
