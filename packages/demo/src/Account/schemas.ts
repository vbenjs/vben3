/*
 * @Author       : ya2glu@163.com
 * @Date         : 2023-11-16 10:06:30
 * @LastEditTime : 2023-11-16 10:08:53
 * @LastEditors  : ya2glu
 * @Description  : account schemas
 * @FilePath     : \vben3\apps\admin\src\pages\demo\system\account\schemas.ts
 */
import { VbenFormSchema } from '@vben/vbencomponents/src/form'
import { VbenColumns } from '@vben/vbencomponents/src/table'

export const formSchema: VbenFormSchema[] = [
  {
    field: 'name',
    label: '用户名',
    component: 'Input',
    required: false,
    gridItemProps: {
      span: 6,
    },
    labelProps: {
      labelPlacement: 'left',
    },
    componentProps: {
      placeholder: '请输入用户名',
    },
  },
  {
    field: 'nickName',
    label: '昵称',
    component: 'Input',
    required: false,
    gridItemProps: {
      span: 6,
    },
    labelProps: {
      labelPlacement: 'left',
    },
    componentProps: {
      placeholder: '请输入昵称',
    },
  },
]

export const userColumns: VbenColumns = [
  {
    field: 'name',
    title: '用户名',
    align: 'center',
  },
  {
    field: 'nickName',
    title: '昵称',
    align: 'center',
  },
  {
    field: 'email',
    title: '邮箱',
    align: 'center',
    showOverflow: 'tooltip',
  },
  {
    field: 'createTime',
    title: '创建时间',
    align: 'center',
  },
  {
    field: 'role',
    title: '角色',
    align: 'center',
    slots: {
      default: ({ row }) => {
        // console.log('rows ->', row);
        return row.role.name
      },
    },
  },
  {
    field: 'dept',
    title: '所属部门',
    align: 'center',
    slots: {
      default: ({ row }) => {
        return `华北-${row.dept.name}`
      },
    },
  },
  {
    field: 'remark',
    title: '备注',
    align: 'center',
    showOverflow: 'tooltip'
  },
  {
    field: 'action',
    title: '操作',
    align: 'center',
    slots: { default: 'action' },
  },
]

