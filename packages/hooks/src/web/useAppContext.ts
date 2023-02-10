import { createContext, useContext } from '../useContext'
import { InjectionKey, Ref } from 'vue'

export interface AppProviderContextProps {
  prefixCls: Ref<string>
  isMobile: Ref<boolean>
}

const key: InjectionKey<AppProviderContextProps> = Symbol()

export function createAppProviderContext(context: AppProviderContextProps) {
  return createContext<AppProviderContextProps>(context, key)
}

export function useAppProviderContext() {
  return useContext<AppProviderContextProps>(key)
}
