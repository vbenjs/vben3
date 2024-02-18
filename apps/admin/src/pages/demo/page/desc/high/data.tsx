export const refundTimeTableSchema = [
  {
    title: '时间',
    minWidth: 150,
    field: 't1',
  },
  {
    title: '当前进度',
    minWidth: 150,
    field: 't2',
  },
  {
    title: '状态',
    minWidth: 150,
    field: 't3',
    slots: {
      default: 't3_default',
    },
  },
  {
    title: '操作员ID	',
    minWidth: 150,
    field: 't4',
  },
  {
    title: '耗时',
    minWidth: 150,
    field: 't5',
  },
]

export const refundTimeTableData: any[] = [
  {
    t1: '2017-10-01 14:10',
    t2: '联系客户',
    t3: '进行中',
    t4: '取货员 ID1234',
    t5: '5mins',
  },
  {
    t1: '2017-10-01 14:10',
    t2: '取货员出发',
    t3: '成功',
    t4: '取货员 ID1234',
    t5: '5mins',
  },
  {
    t1: '2017-10-01 14:10',
    t2: '取货员接单',
    t3: '成功',
    t4: '系统',
    t5: '5mins',
  },
  {
    t1: '2017-10-01 14:10',
    t2: '申请审批通过',
    t3: '成功',
    t4: '用户',
    t5: '1h',
  },
]
