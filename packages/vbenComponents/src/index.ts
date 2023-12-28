import type { App, Component } from 'vue'
const projectName = 'Vben3'
export const components = {
  install: (app: App) => {
    /* 上面写法vite官方已弃用，详情见 https://cn.vitejs.dev/guide/migration-from-v2.html#importmetaglob */
    const comp = import.meta.glob<any>('./**/*.vue', { eager: true })
    Object.keys(comp).forEach((k) => {
      const c = comp[k].default
      switch (c.__name) {
        case 'TabPane':
          c.__TAB_PANE__ = true
          break
        case 'Tab':
          c.__TAB__ = true
          break
        case 'DescriptionsItem':
          c.DESCRIPTION_ITEM_FLAG = true
          break
        case 'FormItemGi':
          c.__GRID_ITEM__ = true
          break
        case 'GridItem':
          c.__GRID_ITEM__ = true
          break
      }
      // 检测未注册组件
      if (!maps.get(c.__name) && !c.name) {
        warn(c.__name)
        return
      }
      app.component(`${c.name || c.__name}`, c)
    })
  },
}

//VC组件map
export const maps = new Map<String, Component | String>()

export function warn(message: string) {
  console.warn(`[${projectName} warn]:<${message}> components not registered!`)
}

export function error(message: string) {
  throw new Error(`[${projectName} error]:${message}`)
}

//Dialog 相关
let registerDialog = () => {}
export let dialog
export const setDialog = (func = () => {}) => {
  registerDialog = func
  console.log('useDialog已注册')
}
export const useDialog = () => {
  dialog = registerDialog()
  if (!dialog) {
    console.log('注册失败')
  }
  return dialog
}

//Notification 相关
let registerNotice = () => {}
export let notice
export const setNotice = (func = () => {}) => {
  registerNotice = func
  console.log('useNotice已注册')
}
export const useNotice = () => {
  notice = registerNotice()
  if (!notice) {
    console.log('注册失败')
  }
  return notice
}

//Message 相关
let registerMsg = () => {}
export let msg
export const useMsg = () => {
  msg = registerMsg()
  if (!msg) {
    console.log('注册失败')
  }
  return msg
}

export const setMessage = (func = () => {}) => {
  registerMsg = func
  console.log('useMsg已注册')
}
