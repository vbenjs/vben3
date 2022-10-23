import { MenuModeEnum, MenuTypeEnum, RoleEnum } from '@vben/constants'
import type { RouteMeta } from 'vue-router'

export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success'
  content?: string
  dot?: boolean
}

export interface Menu {
  name: string

  icon?: string

  path: string

  // path contains param, auto assignment.
  paramPath?: string

  disabled?: boolean

  children?: Menu[]

  orderNo?: number

  roles?: RoleEnum[]

  meta?: Partial<RouteMeta>

  tag?: MenuTag

  hideMenu?: boolean

  label?: Node | JSX.Element | string

  key?: string | number | Symbol
}

export interface MenuModule {
  orderNo?: number
  menu: Menu
}

export interface BeforeMiniState {
  menuCollapsed?: boolean
  menuSplit?: boolean
  menuMode?: MenuModeEnum
  menuType?: MenuTypeEnum
}
