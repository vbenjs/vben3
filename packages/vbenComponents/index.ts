import type { Component, App } from 'vue'
import VXETable from 'vxe-table'
const projectName = 'Vben3'

export function withInstall<T>(component: T, alias?: string) {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(`Vben${comp.name}` || comp.displayName, component)
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

//VC组件map
export const maps = new Map<String, Component>()

//Notification 相关
let registerNotice = () => {}
export let notice = undefined
export const setNotice = (func = () => {}) => {
  registerNotice = func
  console.log('useNotice已注册')
}
export let useNotice = () => {
  notice = registerNotice()
  if (!notice) {
    console.log('注册失败')
  }
  return notice
}

//Message 相关
let registerMsg = () => {}
export let msg = undefined
export let useMsg = () => {
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
// 引入组件
import { VbenPopover } from './popover'
import { VbenDivider } from './divider'
import { VbenTag, VbenDynamicTags } from './tag'
import { VbenTable } from './table'
import { VbenCard } from './card'
import { VbenSpace } from './space'
import { VbenButton, VbenButtonGroup } from './button'
import { VbenAvatar } from './avatar'
import { VbenStatistic } from './statistic'
import { VbenSelect } from './select'
import { VbenInput, VbenInputGroup } from './input'
import { VbenThing } from './thing'
import { VbenPopconfirm } from './popconfirm'
import { VbenIcon } from './icon'
import { VbenCheckbox, VbenCheckboxGroup } from './checkbox'
import { VbenModal } from './modal'
import { VbenEmpty } from './empty'
import { VbenUpload } from './upload'
import { VbenTabs, VbenTabPane } from './tabs'
import { VbenGrid, VbenGridItem } from './grid'
import { VbenEllipsis } from './ellipsis'
import { VbenImage } from './image'
import { VbenMessageProvider } from './message'
import { VbenPagination } from './pagination'
import { VbenRadio, VbenRadioButton, VbenRadioGroup } from './radio'
import { VbenText } from './typography'
import { VbenConfig } from './config'
import { VbenColorPicker } from './colorPicker'
import { VbenDesc, VbenDescItem } from './descriptions'
import { VbenNotificationProvider } from './notification'
import { VbenTimePicker } from './timePicker'
import { VbenDatePicker } from './datePicker'
import { VbenInputNumber } from './inputNumber'
import { VbenDrawer, VbenDrawerContent } from './drawer'
import { VbenForm, VbenFormItem, VbenFormItemGi } from './form'
import { VbenCascader } from './cascader'
import { VbenDropdown } from './dropdown'
import { VbenSwitch } from './switch'
import { isFunction } from 'xe-utils'
export { theme, locale } from './config'
// 初始化组件
// global 是否全局注册
export function initVbenComponent(
  app: App,
  comp: Object,
  global: boolean = true,
) {
  Object.keys(comp).forEach((k) => {
    maps.set(k, comp[k])
  })
  app.use(VXETable)
  if (!global) return
  console.log(VbenCard)
  app
    .use(VbenCard)
    .use(VbenTable)
    .use(VbenTag)
    .use(VbenDivider)
    .use(VbenSpace)
    .use(VbenPopover)
    .use(VbenButton)
    .use(VbenButtonGroup)
    .use(VbenAvatar)
    .use(VbenStatistic)
    .use(VbenSelect)
    .use(VbenInput)
    .use(VbenThing)
    .use(VbenPopconfirm)
    .use(VbenIcon)
    .use(VbenCheckbox)
    .use(VbenCheckboxGroup)
    .use(VbenModal)
    .use(VbenEmpty)
    .use(VbenUpload)
    .use(VbenTabs)
    .use(VbenTabPane)
    .use(VbenGrid)
    .use(VbenGridItem)
    .use(VbenEllipsis)
    .use(VbenImage)
    .use(VbenMessageProvider)
    .use(VbenPagination)
    .use(VbenRadio)
    .use(VbenRadioGroup)
    .use(VbenRadioButton)
    .use(VbenText)
    .use(VbenConfig)
    .use(VbenDynamicTags)
    .use(VbenColorPicker)
    .use(VbenDesc)
    .use(VbenDescItem)
    .use(VbenNotificationProvider)
    .use(VbenTimePicker)
    .use(VbenDatePicker)
    .use(VbenInputNumber)
    .use(VbenDrawer)
    .use(VbenDrawerContent)
    .use(VbenForm)
    .use(VbenFormItemGi)
    .use(VbenFormItem)
    .use(VbenCascader)
    .use(VbenDropdown)
    .use(VbenInputGroup)
    .use(VbenSwitch)
}
