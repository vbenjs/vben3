import { VbenFormSchema } from '@vben/vbencomponents/src/form'
import { VbenColumns } from '@vben/vbencomponents/src/table'

export interface tableData {
  table: {
    items: Array<object>
    total: number
  }
}

const formSchema: VbenFormSchema[] = [
  {
    field: 'name',
    label: '部门名称',
    component: 'Input',
    required: false,
    gridItemProps: {
      span: 6,
    },
    labelProps: {
      labelPlacement: 'left',
    },
    componentProps: {
      placeholder: '请输入部门名称',
    },
  },
  {
    field: 'state',
    label: '状态',
    component: 'Select',
    required: false,
    gridItemProps: {
      span: 6,
    },
    labelProps: {
      labelPlacement: 'left',
    },
    componentProps: {
      placeholder: '请选择',
    },
  },
]

const deptColumns: VbenColumns = [
  {
    field: 'id',
    title: 'ID',
    align: 'center',
    treeNode: true,
  },
  {
    field: 'deptName',
    title: '部门名称',
    align: 'center',
  },
  {
    field: 'sort',
    title: '排序',
    align: 'center',
  },
  {
    field: 'state',
    title: '状态',
    align: 'center',
    slots: {
      default: ({ row }) => {
        return (
          <VbenTag
            size={'small'}
            type={row.state.value === '1' ? 'info' : 'error'}
          >
            {row.state.name}
          </VbenTag>
        )
      },
    },
  },
  {
    field: 'createTime',
    title: '创建时间',
    align: 'center',
  },
  {
    field: 'remark',
    title: '备注',
    align: 'center',
  },
  {
    field: 'action',
    title: '操作',
    align: 'center',
    slots: { default: 'action' },
  },
]

export { formSchema, deptColumns }
