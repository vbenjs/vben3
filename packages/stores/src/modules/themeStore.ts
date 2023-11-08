import { defineStore } from 'pinia'
import { ThemeEnum } from '@vben/constants'

interface ThemeColorConfig {
  primaryColor: string //主题色
  infoColor: string //信息色
  successColor: string //成功色
  warningColor: string //警告色
  errorColor: string //错误色
  textBaseColor: string //文本色
  bgBaseColor: string //背景色
}

interface ThemeStoreState {
  themeConfig: ThemeColorConfig
  theme: ThemeEnum
}

export const useThemeStore = defineStore({
  id: 'APP_THEME',
  state: (): ThemeStoreState => ({
    themeConfig: {
      primaryColor: '#2a64d4',
      infoColor: '#2080F0',
      successColor: '#52c41a',
      warningColor: '#faad14',
      errorColor: '#D03050',
      textBaseColor: '#000000',
      bgBaseColor: '#ffffff',
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
