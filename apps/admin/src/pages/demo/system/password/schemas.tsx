import { VbenFormSchema } from '@vben/vbencomponents/src/form'

const formSchema: VbenFormSchema[] = [
  {
    field: 'password',
    label: '当前密码',
    component: 'InputPassword',
    required: true,
    gridItemProps: {
      span: 12,
      offset: 2
    },
    labelProps: {
      labelPlacement: 'top',
    },
    componentProps: {
      placeholder: '请输入当前密码',
    },
  },
  {
    field: 'nPwd',
    label: '新密码',
    component: 'StrengthMeter',
    required: true,
    gridItemProps: {
      span: 12,
      offset: 2
    },
    labelProps: {
      labelPlacement: 'top',
    },
    componentProps: {
      placeholder: '新密码',
    },
  },
  {
    field: 'cPwd',
    label: '确认密码',
    component: 'InputPassword',
    required: true,
    gridItemProps: {
      span: 12,
      offset:2 
    },
    labelProps: {
      labelPlacement: 'top',
    },
    componentProps: {
      placeholder: '确认密码',
    },
  },
]
export { formSchema }
