import { LAYOUT } from '../../basic'

const pages: RouteRecordItem = {
  path: '/pages',
  name: 'Pages',
  component: LAYOUT,
  redirect: '/pages/index',
  meta: {
    orderNo: 5,
    title: '页面',
    icon: 'iconoir:multiple-pages-empty',
    root: true
  },
  children: []
}

export default pages;
