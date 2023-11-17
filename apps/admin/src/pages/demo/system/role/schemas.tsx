import { VbenFormSchema } from '@vben/vbencomponents/src/form'
import { VbenColumns } from '@vben/vbencomponents/src/table'

export const roleColumns: VbenColumns = [
  {
    field: 'roleName',
    title: '角色名称',
    align: 'center',
  },
  {
    field: 'roleValue',
    title: '角色值',
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
          <VbenTag type={row.state.value === '1' ? 'info' : 'error'}>
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

export const roleSchema: VbenFormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    component: 'Input',
    required: false,
    gridItemProps: {
      span: 6,
    },
    labelProps: {
      labelPlacement: 'left',
    },
    componentProps: {
      placeholder: '请输入角色名称',
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
