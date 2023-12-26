import { VbenFormSchema } from '@vben/vbencomponents/src/form'

export const roleAddFormSchema: VbenFormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    component: 'Input',
    required: true,
    gridItemProps: {
      span: 24,
    },
    labelProps: {
      labelPlacement: 'left',
      labelAlign: 'right',
      labelWidth: 80,
    },
    componentProps: {
      placeholder: '请输入角色名',
    },
  },
  {
    field: 'roleValue',
    label: '角色值',
    component: 'Input',
    required: true,
    gridItemProps: {
      span: 24,
    },
    labelProps: {
      labelPlacement: 'left',
      labelAlign: 'right',
      labelWidth: 80,
    },
    componentProps: {
      placeholder: '请输入角色值',
    },
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    required: true,
    gridItemProps: {
      span: 24,
    },
    labelProps: {
      labelPlacement: 'left',
      labelAlign: 'right',
      labelWidth: 80,
    },
  },
  {
    field: 'state',
    label: '状态',
    component: 'Select',
    required: true,
    gridItemProps: {
      span: 24,
    },
    labelProps: {
      labelPlacement: 'left',
      labelAlign: 'right',
      labelWidth: 80,
    },
    componentProps: {
      placeholder: '请选择',
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    required: false,
    gridItemProps: {
      span: 24,
    },
    labelProps: {
      labelPlacement: 'left',
      labelAlign: 'right',
      labelWidth: 80,
    },
    componentProps: {
      placeholder: '请输入备注',
    },
  },
]
