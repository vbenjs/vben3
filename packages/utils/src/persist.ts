import type { PiniaPluginContext } from 'pinia'
import { get, set } from 'lodash-es'
import 'pinia'

interface PersistIM {
  strategies: StrategyIM[]
}

interface StrategyIM {
  key?: string
  storage?: Storage
  paths?: string[]
}

export interface CreateOptions {
  defaultStorage?: Storage
  namespace?: string
}

type Store = PiniaPluginContext['store']
type PartialState = Partial<Store['$state']>

const STORAGE_NAMESPACE = '__STORE__'

export const createPersistPlugin = ({
  defaultStorage = localStorage,
  namespace = STORAGE_NAMESPACE,
}: CreateOptions = {}) => {
  console.log('的翻个身京东方刻录机管理局来看待', namespace)
  const getDefaultStorage = (strategy: StrategyIM) =>
    strategy.storage || defaultStorage

  const getRootStore = (strategy: StrategyIM) => {
    if (!namespace) {
      return
    }

    const storage = getDefaultStorage(strategy)
    return storage.getItem(namespace) || '{}'
  }

  const updateStorage = (strategy: StrategyIM, store: Store) => {
    const storage = getDefaultStorage(strategy)
    const storeKey = strategy.key || store.$id
    const rootStore = getRootStore(strategy)

    let state: PartialState = {}
    if (strategy.paths) {
      const partialState = strategy.paths.reduce((finalObj, key) => {
        set(finalObj, key, get(store.$state, key))
        return finalObj
      }, {} as PartialState)
      state = partialState
    } else {
      state = store.$state
    }

    if (!rootStore) {
      storage.setItem(storeKey, JSON.stringify(state))
    } else {
      const _rootStore = rootStore ? JSON.parse(rootStore as string) : {}
      _rootStore[storeKey] = state
      storage.setItem(namespace, JSON.stringify(_rootStore))
    }
  }

  const plugin = ({ options, store }): void => {
    const { persist } = options

    if (!persist) {
      return
    }

    const defaultState: StrategyIM[] = [
      {
        key: store.$id,
        storage: localStorage,
      },
    ]

    const strategies = persist?.strategies?.length
      ? persist?.strategies
      : defaultState

    strategies.forEach((strategy) => {
      const storage = getDefaultStorage(strategy)
      const storeKey = strategy.key || store.$id
      let storageResult: string | null = null
      const rootStore = getRootStore(strategy)

      storageResult = !rootStore
        ? storage.getItem(storeKey)
        : JSON.parse(rootStore)[storeKey]

      if (storageResult) {
        const result =
          typeof storageResult === 'string'
            ? JSON.parse(storageResult)
            : storageResult

        store.$state = result
        store.$patch(result)
        updateStorage(strategy, store)
      }
    })

    store.$subscribe(() => {
      strategies.forEach((strategy) => {
        updateStorage(strategy, store)
      })
    })
  }

  return plugin
}

declare module 'pinia' {
  // @ts-ignore
  export interface DefineStoreOptionsBase {
    persist?: PersistIM
  }
}
