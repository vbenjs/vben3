import { computed, onUnmounted, unref, watch, watchEffect } from 'vue'
import { useThrottleFn } from '@vben/utils'

import { useLockStore } from '@/store/lock'
import { useConfigStore } from '@/store/config'
import { useUserStore } from '@/store/user'
import { useRootSetting } from '@vben/hooks'
import { BASIC_LOCK_PATH } from '@vben/constants'
import { router } from '@/router'

const LOCK_PATH = BASIC_LOCK_PATH

export function useLockScreen() {
  const { getLockTime } = useRootSetting()
  const lockStore = useLockStore()
  const userStore = useUserStore()
  const configStore = useConfigStore()

  let timeId: TimeoutHandle

  function clear(): void {
    window.clearTimeout(timeId)
  }

  function resetCalcLockTimeout(): void {
    // not login
    if (!userStore.getAccessToken) {
      clear()
      return
    }
    const lockTime = configStore.getProjectConfig.lockTime
    if (!lockTime || lockTime < 1) {
      clear()
      return
    }
    clear()

    timeId = setTimeout(() => {
      lockPage()
    }, lockTime * 60 * 1000)
  }

  function lockPage(): void {
    lockStore.setLockInfo({
      isLock: true,
      pwd: undefined,
    })
  }

  watchEffect((onClean) => {
    if (userStore.getAccessToken) {
      resetCalcLockTimeout()
    } else {
      clear()
    }
    onClean(() => {
      clear()
    })
  })

  watch(
    () => lockStore.getLockInfo?.isLock,
    (newValue) => {
      if (newValue) {
        router.replace({
          path: LOCK_PATH,
          query: { redirect: unref(router.currentRoute).path },
        })
      }
    },
    { deep: true },
  )

  onUnmounted(() => {
    clear()
  })

  const keyupFn = useThrottleFn(resetCalcLockTimeout, 2000)

  return computed(() => {
    if (unref(getLockTime)) {
      return { onKeyup: keyupFn, onMousemove: keyupFn }
    } else {
      clear()
      return {}
    }
  })
}
