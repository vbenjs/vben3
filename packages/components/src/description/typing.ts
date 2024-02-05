import type { VNode, CSSProperties } from 'vue'

declare type Recordable<T = any> = Record<string, T>

export interface DescItem {
  labelMinWidth?: number
  contentMinWidth?: number
  labelStyle?: CSSProperties
  field: string
  label: string | VNode | JSX.Element
  // Merge column
  span?: number
  show?: (...arg: any) => boolean
  // render
  render?: (
    val: any,
    data: Recordable,
  ) => VNode | undefined | JSX.Element | Element | string | number
}

export interface DescriptionProps {
  title?: string
  useContainer?: boolean
  /**
   * item configuration
   * @type DescItem
   */
  schema: DescItem[]
  /**
   * 数据
   * @type object
   */
  data: Recordable
}

export interface DescInstance {
  setDescProps(descProps: Partial<DescriptionProps>): void
}

export type Register = (descInstance: DescInstance) => void

/**
 * @description:
 */
export type UseDescReturnType = [Register, DescInstance]
