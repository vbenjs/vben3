import type { VxeGridProps,VxeTableEvents } from 'vxe-table-demonic'
import { VxeGridPropTypes } from 'vxe-table-demonic'

export type VbenTableProps<D = any> = VxeGridProps<D> & {
  api?: Function
  params?: Object
  title?: string
  pagination?: boolean | VxeGridPropTypes.PagerConfig
  afterFetch?: Function
}
export type VbenColumns = VxeGridPropTypes.Columns

export type VbenCellClick=VxeTableEvents.CellClick
