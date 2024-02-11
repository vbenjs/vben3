import type {
  VNode,
  CSSProperties,
  ExtractPublicPropTypes,
  PropType,
} from 'vue'

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

export const descriptionsProps = {
  title: String,
  column: {
    type: Number,
    default: 3,
  },
  columns: Number,
  labelPlacement: {
    type: String as PropType<'left' | 'top'>,
    default: 'top',
  },
  labelAlign: {
    type: String as PropType<'left' | 'right' | 'center'>,
    default: 'left',
  },
  separator: {
    type: String,
    default: ':',
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium',
  },
  bordered: Boolean,
  labelClass: String,
  labelStyle: [Object, String] as PropType<string | CSSProperties>,
  contentClass: String,
  contentStyle: [Object, String] as PropType<string | CSSProperties>,
} as const

export type DescriptionsProps = ExtractPublicPropTypes<typeof descriptionsProps>

export interface DescriptionProps extends DescriptionsProps {
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
