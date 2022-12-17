import { computed, onUnmounted, unref, watchEffect } from 'vue';
import { useThrottleFn } from '@vueuse/core';

import { useLockStore } from '@/store/lock';
import { useConfigStore } from '@/store/config'
import { useUserStore } from '@/store/user';
import { useRootSetting } from '../setting/useRootSetting';

export function useLockPage() {
  const { getLockTime } = useRootSetting();
  const lockStore = useLockStore();
  const userStore = useUserStore();
  const configStore = useConfigStore()

  let timeId: TimeoutHandle;

  function clear(): void {
    window.clearTimeout(timeId);
  }

  function resetCalcLockTimeout(): void {
    // not login
    if (!userStore.getAccessToken) {
      clear();
      return;
    }
    const lockTime = configStore.getProjectConfig.lockTime;
    if (!lockTime || lockTime < 1) {
      clear();
      return;
    }
    clear();

    timeId = setTimeout(() => {
      lockPage();
    }, lockTime * 60 * 1000);
  }

  function lockPage(): void {
    console.log('锁屏')
    lockStore.setLockInfo({
      isLock: true,
      pwd: undefined,
    });
  }

  watchEffect((onClean) => {
    if (userStore.getAccessToken) {
      resetCalcLockTimeout();
    } else {
      clear();
    }
    onClean(() => {
      clear();
    });
  });

  onUnmounted(() => {
    clear();
  });

  const keyupFn = useThrottleFn(resetCalcLockTimeout, 2000);

  return computed(() => {
    if (unref(getLockTime)) {
      return { onKeyup: keyupFn, onMousemove: keyupFn };
    } else {
      clear();
      return {};
    }
  });
}
