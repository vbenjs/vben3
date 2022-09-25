import type { Component, App } from 'vue'
const projectName = 'Vben3'
export const components = {
  install: (app: App) => {
    // @ts-ignore
    const comp = import.meta.globEager('./**/*.vue')

    Object.keys(comp).forEach((k) => {
      const c = comp[k].default
      // console.log(`Vben${c.__name}` || `Vben${c.name}`, c)
      console.log(c)
      app.component(`Vben${c.__name}` || `Vben${c.name}`, c)
    })
  },
}

//VC组件map
export const maps = new Map<String, Component>()

export function withInstall<T>(component: T, alias?: string) {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(
      `Vben${comp.__name}` || `Vben${comp.name}` || comp.displayName,
      comp,
    )
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}

export function warn(message: string) {
  console.warn(`[${projectName} warn]:${message}`)
}

export function error(message: string) {
  throw new Error(`[${projectName} error]:${message}`)
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
