import { VbenFormSchema } from '@vben/vbencomponents/src/form'

export const accountAddFormSchema: VbenFormSchema[] = [
  {
    field: 'userName',
    label: '用户名',
    component: 'Input',
    required: true,
    gridItemProps: {
      span: 24,
    },
    labelProps: {
      labelPlacement: 'left',
      labelAlign: 'right',
      labelWidth: 100,
    },
    componentProps: {
      placeholder: '请输入用户名',
    },
  },
  {
    field: 'nickName',
    label: '昵称',
    component: 'Input',
    required: true,
    gridItemProps: {
      span: 24,
    },
    labelProps: {
      labelPlacement: 'left',
      labelAlign: 'right',
      labelWidth: 100,
    },
    componentProps: {
      placeholder: '请输入昵称',
    },
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    required: true,
    gridItemProps: {
      span: 24,
    },
    labelProps: {
      labelPlacement: 'left',
      labelAlign: 'right',
      labelWidth: 100,
    },
    componentProps: {
      placeholder: '请输入邮箱',
    },
  },
  {
    field: 'role',
    label: '角色',
    component: 'Select',
    required: true,
    gridItemProps: {
      span: 24,
    },
    labelProps: {
      labelPlacement: 'left',
      labelAlign: 'right',
      labelWidth: 100,
    },
    componentProps: {
      placeholder: '请选择',
    },
  },
  {
    field: 'dept',
    label: '所属部门',
    component: 'TreeSelect',
    required: true,
    gridItemProps: {
      span: 24,
    },
    labelProps: {
      labelPlacement: 'left',
      labelAlign: 'right',
      labelWidth: 100,
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
      labelWidth: 100,
    },
    componentProps: {
      placeholder: '请输入备注',
    },
  },
]
