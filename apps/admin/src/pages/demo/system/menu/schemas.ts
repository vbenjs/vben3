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
    field: 'menuName',
    title: '菜单名称',
    width: '20%',
    align: 'center',
    fixed: 'left'
  },
  {
    field: 'menuFlags',
    title: '权限标识',
    align: 'center',
    width: '10%',
  },
  {
    field: 'menuComp',
    title: '组件',
    align: 'center',
    width: '40%',
  },
  {
    field: 'menuSort',
    title: '排序',
    align: 'center',
    width: '5%'
  },
  {
    field: 'menuState',
    title: '状态',
    align: 'center',
    width: '5%'
  },
  {
    field:'menuCreate',
    title: '创建时间',
    align: 'center',
    width: '20%'
  }
]
