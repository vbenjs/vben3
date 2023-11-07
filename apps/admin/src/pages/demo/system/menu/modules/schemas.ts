import { VbenFormSchema } from '@vben/vbencomponents/src/form'
import { getRadioData } from '@vben/demo/src/apis/form'
export const menuAddSchema: VbenFormSchema[] = [
  {
    field: 'types',
    label: '菜单类型',
    component: 'RadioGroup',
    required: true,
    gridItemProps: {
      span: 24,
    },
    componentProps: {
      type: 'button',
      api: getRadioData,
    },
  },
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
    required: true,
    gridItemProps: {
      span: 24,
    },
    labelProps: {
      labelPlacement: 'left',
    },
    componentProps: {
      placeholder: '请输入',
    },
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    gridItemProps: { span: 24 },
    labelProps: {
      labelPlacement: 'left',
    },
    componentProps: {
      placeholder: '请输入',
    },
  },
  {
    field: 'parentId',
    label: '上级菜单',
    component: 'Input',
    gridItemProps: { span: 24 },
    labelProps: {
      labelPlacement: 'left',
    },
    componentProps: {
      placeholder: '请输入',
    },
  },
  {
    field: 'router',
    label: '路由地址',
    component: 'Input',
    gridItemProps: { span: 24 },
    labelProps: {
      labelPlacement: 'left',
    },
    componentProps: {
      placeholder: '请输入',
    },
  },
  {
    field: 'state',
    label: '状态',
    component: 'RadioGroup',
    gridItemProps: { span: 24 },
    labelProps: {
      labelPlacement: 'left',
    },
    componentProps: {
      type: 'button',
      options: [
        { value: '1', label: '启用' },
        { value: '2', label: '禁用' },
      ],
    },
  },
  {
    field: 'linked',
    label: '是否外链',
    component: 'RadioGroup',
    gridItemProps: { span: 24 },
    labelProps: {
      labelPlacement: 'left',
    },
    componentProps: {
      type: 'button',
      options: [
        { value: '1', label: '是' },
        { value: '2', label: '否' },
      ],
    },
  },
  {
    field: 'displayed',
    label: '是否显示',
    component: 'RadioGroup',
    gridItemProps: { span: 24 },
    labelProps: {
      labelPlacement: 'left',
    },
    componentProps: {
      type: 'button',
      options: [
        { value: '1', label: '是' },
        { value: '2', label: '否' },
      ],
    },
  },
]
