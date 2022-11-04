import type { App } from 'vue'
export { initComp } from './bridge'
import VXETable from 'vxe-table'
export { VbenIconify } from './src/iconify'
//VC组件map

// 初始化组件
// global 是否全局注册
import { maps, components } from './src'
export { setNotice, setMessage, notice, msg, useNotice, useMsg } from './src'
export function initVbenComponent(app: App, comp: Object, global = true) {
  Object.keys(comp).forEach((k) => {
    maps.set(k, comp[k])
  })
  app.use(VXETable)
  app.use(components)
  if (!global) return
}

export { useTable } from '#/table'
export { useForm } from '#/form'
