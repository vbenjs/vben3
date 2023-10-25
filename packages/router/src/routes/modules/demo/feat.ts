import { LAYOUT } from '../../basic'

const feat: RouteRecordItem = {
  path: '/feat',
  name: 'Feat',
  component: LAYOUT,
  redirect: '/feat/index',
  meta: {
    orderNo: 4,
    title: '功能',
    icon: 'ri:function-line',
    root: true
  },
  children: []
}

export default feat

