import type {Ref, ShallowRef, UnwrapRef} from "vue";
import { effectScope, ref, shallowRef, unref, watch } from "vue";
import { containsProp, tryOnBeforeUnmount, useDebounceFn } from "@vueuse/core";
import { isEqual } from "lodash-es";

export interface UsePromiseConfig {
  /**
   * 是否立即执行
   * default: true
   */
  immediate?: boolean
  /**
   * 参数变化时是否自动执行函数
   * default: false
   */
  redo?: boolean
  /**
   * 仅当redo = true时生效, 防抖时间. 单位 ms
   * default: 0(ms)
   */
  debounce?: number
  /**
   * 再次请求时是否忽略当前的loading状态(能否重复执行)
   * default: false
   */
  ignoreLoading?: boolean
  /**
   * 函数执行失败时是否对外抛出异常
   * default: false
   */
  throwOnFailed?: boolean
}

export interface UsePromiseReturnType<T> {
  data: ShallowRef<T | null>
  loading: Ref<UnwrapRef<boolean>>
  handleFn: () => Promise<T | null>
  error: ShallowRef<unknown>
  finished: Ref<UnwrapRef<boolean>>
}

function isUsePromiseConfig(obj: object): obj is UsePromiseConfig {
  return containsProp(obj, 'immediate', 'redo', 'debounce', 'ignoreLoading', 'throwOnFailed')
}

export function usePromise<T = any>(
  fn: (...args: any[]) => Promise<T>
): UsePromiseReturnType<T>

export function usePromise<T = any>(
  fn: (...args: any[]) => Promise<T>,
  config: UsePromiseConfig
): UsePromiseReturnType<T>

export function usePromise<T = any>(
  fn: (...args: any[]) => Promise<T>,
  fnArgs: unknown,
  config?: UsePromiseConfig
): UsePromiseReturnType<T>

export function usePromise<T = any>(
  fn: (...args: any[]) => Promise<T>,
  ...args: any[]
): UsePromiseReturnType<T> {
  const data = shallowRef<T | null>(null)
  const loading = ref(false)
  const finished = ref(false)
  const error = shallowRef<unknown>(null)

  // fn params
  const fnArgs = ref<unknown>()

  // config
  let config: UsePromiseConfig = {
    immediate: true,
    redo: false,
    debounce: 0,
    ignoreLoading: false,
    throwOnFailed: false
  }

  function handleFn(): Promise<T | null> {
    return new Promise((resolve, reject) => {
      const { ignoreLoading, throwOnFailed } = config
      if (!ignoreLoading && loading.value) {
        return
      }
      loading.value = true
      finished.value = false
      fn.call(undefined, unref(fnArgs)).then((res) => {
        data.value = res
        error.value = null
        return resolve(res)
      }).catch((e) => {
        data.value = null
        error.value = e
        if (throwOnFailed) {
          return reject(e)
        }
        return resolve(null)
      }).finally(() => {
        loading.value = false
        finished.value = true
      })
    })
  }

  // 存在不在vue3 setup中执行.
  const scoped = effectScope()

  scoped.run(() => {
    if (args.length > 0) {
      if (isUsePromiseConfig(args[0]))
        config = { ...config, ...args[0] }
      else
        fnArgs.value = args[0]
    }

    if (args.length > 1) {
      if (isUsePromiseConfig(args[1]))
        config = { ...config, ...args[1] }
    }

    const { debounce, immediate, redo } = config
    const debounceFn = useDebounceFn(() => {
      return handleFn();
    }, debounce);

    if (immediate) {
      debounceFn().then()
    }

    if (redo) {
      watch(fnArgs, (newArgs, oldArgs) => {
        if (!isEqual(newArgs, oldArgs)) {
          debounceFn().then()
        }
      }, { deep: true })
    }
  })

  tryOnBeforeUnmount(() => {
    scoped.stop()
  })

  return {
    data,
    loading,
    finished,
    error,
    handleFn,
  }
}
