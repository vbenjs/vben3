import { VbenFormSchema } from "@vben/vbencomponents/src/form";

export const deptAddFormSchema: VbenFormSchema[] = [
  {
    field: "deptName",
    label: '部门名称',
    component: 'Input',
    required: true,
    gridItemProps: {
      span: 24
    },
    labelProps: {
      labelAlign: 'right',
      labelPlacement: 'left',
      labelWidth: 80
    },
    componentProps: {
      placeholder: '请输入部门名称'
    }
  },
  {
    field: 'parentId',
    label: '上级部门',
    component: 'Select',
    required: false,
    gridItemProps: {
      span: 24
    },
    labelProps: {
      labelAlign: 'right',
      labelPlacement: 'left',
      labelWidth: 80
    },
    componentProps: {
      placeholder: '请选择'
    }
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    required: false,
    gridItemProps: {
      span: 24
    },
    labelProps: {
      labelAlign: 'right',
      labelPlacement: 'left',
      labelWidth: 80
    },
  },
  {
    field: 'state',
    label: '启用状态',
    component: 'Select',
    required: true,
    gridItemProps: {
      span: 24
    },
    labelProps: {
      labelAlign: 'right',
      labelPlacement: 'left',
      labelWidth: 80
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    required:false,
    gridItemProps: {
      span: 24
    },
    labelProps: {
      labelAlign: 'right',
      labelPlacement: 'left',
      labelWidth: 80
    },
    componentProps: {
      placeholder: '请输入备注'
    }
  }
]
