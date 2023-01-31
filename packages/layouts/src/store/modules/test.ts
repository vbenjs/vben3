import { defineStore } from '@vben/pinia'

export const useLayoutTest = defineStore({
  id: 'use--layout--test',
  state: () => ({
    test: 'layout 测试',
  }),
  actions: {
    setTest(value: string) {
      this.test = value
    },
  },
  persist: true,
})
