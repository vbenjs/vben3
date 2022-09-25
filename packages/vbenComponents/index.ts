import type { Component, App } from 'vue'
export { initComp } from './bridge'
import VXETable from 'vxe-table'

//VC组件map

export { theme, locale } from './src/config'
// 初始化组件
// global 是否全局注册
import { components, maps, setNotice, setMessage, notice, msg } from './src'
export { maps, setNotice, setMessage, notice, msg }
export function initVbenComponent(app: App, comp: Object, global = true) {
  Object.keys(comp).forEach((k) => {
    maps.set(k, comp[k])
  })

  app.use(VXETable)
  app.use(components)
  console.log(app)
  if (!global) return
}
