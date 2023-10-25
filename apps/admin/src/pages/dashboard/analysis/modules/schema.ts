import { VbenColumns } from '@vben/vbencomponents/src/table'

export const operatorColumns: VbenColumns = [
  {
    field: 'userId',
    title: 'ID',
    align: 'center',
    width: '10%',
    sortable: true,
  },
  {
    field: 'operatorName',
    title: '操作人',
    align: 'center',
  },
  {
    field: 'record',
    title: '操作记录',
    align: 'center',
    width: '50%',
  },
  {
    field: 'createTime',
    title: '操作时间',
    align: 'center',
  },
  {
    field: 'updateTime',
    title: '更新时间',
    align: 'center',
  },
]


