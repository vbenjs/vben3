import {LAYOUT} from '../../basic'

const charts: RouteRecordItem = {
  path: '/charts',
  name: 'Charts',
  component: LAYOUT,
  redirect: '/charts/index',
  meta: {
    title: '图表',
    orderNo: 6,
    icon: 'material-symbols:bubble-chart-outline',
    root: true
  },
  children: []
}

export default charts
