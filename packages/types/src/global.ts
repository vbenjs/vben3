import type { VNodeChild, PropType as VuePropType } from 'vue'
import type { RouteRecordItem as IRouteRecordItem } from './router'

declare global {
  // define global
  const __VITE_USE_MOCK__: boolean
  const __APP_INFO__: {
    pkg: {
      name: string
      version: string
      dependencies: Recordable<string>
      devDependencies: Recordable<string>
    }
    lastBuildTime: string
  }

  // router
  type RouteRecordItem = IRouteRecordItem

  // vue
  type PropType<T> = VuePropType<T>
  type VueNode = VNodeChild | JSX.Element

  // utils
  type AnyFunction<T> = (...args: any[]) => T
  type PartialReturnType<T extends (...args: unknown[]) => unknown> = Partial<
    ReturnType<T>
  >
  type Nullable<T> = T | null
  type Recordable<T> = Record<string, T>
  type TimeoutHandle = ReturnType<typeof setTimeout>
  type IntervalHandle = ReturnType<typeof setInterval>
  type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
  }

  // import.meta
  interface ImportMetaEnv extends ViteEnv {
    __: never
  }
  interface ViteEnv {
    VITE_USE_MOCK: boolean
    VITE_PUBLIC_PATH: string
    VITE_PROXY: [string, string][]
    VITE_GLOB_APP_TITLE: string
    VITE_GLOB_APP_SHORT_NAME: string
    VITE_DROP_CONSOLE: boolean
    VITE_USE_HTTPS: boolean
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
    VITE_USE_IMAGEMIN: boolean
  }
}
