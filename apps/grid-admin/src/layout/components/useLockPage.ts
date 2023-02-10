import { computed, onUnmounted, watchEffect } from 'vue'
import { useThrottleFn } from '@vben/utils'
import { useLockStore } from '@/store/lock'
import { useUserStore } from '@/store/user'

export function useLockPage() {
  const lockStore = useLockStore()
  const userStore = useUserStore()

  let timeId: TimeoutHandle

  function clear(): void {
    window.clearTimeout(timeId)
  }

  function resetCalcLockTimeout(): void {
    // not login
    if (!userStore.getToken) {
      clear()
      return
    }
    const lockTime = 0
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
    if (userStore.getToken) {
      resetCalcLockTimeout()
    } else {
      clear()
    }
    onClean(() => {
      clear()
    })
  })

  onUnmounted(() => {
    clear()
  })

  const keyupFn = useThrottleFn(resetCalcLockTimeout, 2000)

  return computed(() => {
    if (0) {
      return { onKeyup: keyupFn, onMousemove: keyupFn }
    } else {
      clear()
      return {}
    }
  })
}
