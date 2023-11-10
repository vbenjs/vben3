import { VbenFormSchema } from "@vben/vbencomponents/src/form";
import { VbenColumns } from "@vben/vbencomponents/src/table";
export interface tableData {

}

export const formSchema: VbenFormSchema[] = [
  {
    field: "name",
    label: "菜单名称",
    component: 'Input',
    required: false,
    gridItemProps: {
      span: 6
    },
    labelProps: {
      labelPlacement: 'left'
    },
    componentProps: {
      placeholder: '请输入菜单名称'
    }
  },
  {
    field: "state",
    label: "状态",
    component: "Select",
    required: false,
    gridItemProps: {
      span: 6
    },
    labelProps: {
      labelPlacement: 'left'
    },
    componentProps: {
      placeholder: '请选择'
    }
  }
]

export const menuColumns:VbenColumns = [
  {
    field: 'name',
    title: '菜单名称',
    width: '20%',
    align: 'center',
    fixed: 'left'
  },
  {
    field: 'permission',
    title: '权限标识',
    align: 'center',
    width: '10%',
  },
  {
    field: 'component',
    title: '组件',
    align: 'center',
    width: '40%',
  },
  {
    field: 'icon',
    title: '图标',
    align: 'center',
    width: '5%'
  },
  {
    field: 'orderNo',
    title: '排序',
    align: 'center',
    width: '5%'
  },
  {
    field: 'status',
    title: '状态',
    align: 'center',
    width: '5%'
  },
  {
    field:'createTime',
    title: '创建时间',
    align: 'center',
    width: '15%'
  }
]
