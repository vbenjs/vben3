import { defineStore } from 'pinia'
import { ThemeEnum } from '@vben/constants'

interface ThemeColorConfig {
  colorPrimary: string //主题色
  colorInfo: string //信息色
  colorSuccess: string //成功色
  colorWarning: string //警告色
  colorError: string //错误色
  colorTextBase: string //文本色
  colorBgBase: string //背景色
}

interface ThemeStoreState {
  themeConfig: ThemeColorConfig
  theme: ThemeEnum
}

export const useThemeStore = defineStore({
  id: 'APP_THEME',
  state: (): ThemeStoreState => ({
    themeConfig: {
      colorPrimary: '#2a64d4',
      colorInfo: '#2080F0',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#D03050',
      colorTextBase: '#000000',
      colorBgBase: '#ffffff',
    },
    theme: ThemeEnum.LIGHT,
  }),
  getters: {
    getThemeConfig(state) {
      return state.themeConfig
    },
    getTheme(state) {
      return state.theme
    },
  },
  actions: {
    setTheme(value: ThemeEnum) {
      this.theme = value
    },
    setThemeConfig(config: Partial<ThemeColorConfig>) {
      this.themeConfig = { ...this.themeConfig, ...config }
    },
  },
  persist: true,
})
