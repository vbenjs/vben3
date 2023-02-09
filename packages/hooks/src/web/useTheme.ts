import { useAppConfig } from '../config'
import { ThemeEnum } from '@vben/constants'
import { useEventListener } from '@vben/utils'

export const useTheme = (listen = false) => {
  const { setAppConfig } = useAppConfig()
  if (listen) {
    // 监听系统主题
    useEventListener(
      window.matchMedia('(prefers-color-scheme: dark)'),
      'change',
      (e: Event) => {
        // @ts-ignore
        setAppConfig({ theme: e.matches ? ThemeEnum.DARK : ThemeEnum.LIGHT })
      },
    )
  }

  return {}
}
