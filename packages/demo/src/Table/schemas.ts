import { VbenColumns } from '../../../vbenComponents/src/table'

export interface Data {
  table: {
    items: any[]
    total: number
  }
}
export const baseColumns: VbenColumns = [
  {
    field: 'userId',
    title: 'id',
    align: 'center',
    width: '10%',
  },
  {
    field: 'username',
    title: '名称',
    width: '10%',
  },
  {
    field: 'realname',
    title: '真实名称',
    width: '10%',
  },
  {
    field: 'address',
    title: '地址',
    width: '10%',
  },
  {
    field: 'startTime',
    title: '开始时间',
    align: 'center',
    width: '10%',
  },
  {
    field: 'endTime',
    title: '结束时间',
    align: 'center',
    width: '10%',
  },
  {
    field: 'desc',
    title: '描述',
    align: 'center',
    width: '40%',
  },
]
export const fixedColumns: VbenColumns = [
  { field: 'userId', title: 'id', width: 100, fixed: 'left' },
  { field: 'username', title: '名称', width: 120, fixed: 'left' },
  { field: 'realname', title: '真实名称', width: 280 },
  { field: 'address', title: '地址', width: 280 },
  { field: 'startTime', title: '开始时间', width: 280 },
  { field: 'endTime', title: '结束时间', width: 280 },
  {
    field: 'desc',
    title: '备注',
    width: 280,
    fixed: 'right',
  },
]

export const innerLabels: string[] = [
  'userId',
  'username',
  'realname',
  'address',
  'startTime',
  'endTime',
  'desc',
]

export const innerColumns: VbenColumns = [
  { field: 'label', title: 'label' },
  { field: 'value', title: 'value' },
]
