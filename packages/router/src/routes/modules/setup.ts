import { LAYOUT } from '../basic'

const setup: RouteRecordItem = {
  path: '/setup',
  name: 'SetupDemo',
  component: LAYOUT,
  redirect: '/setup/index',
  meta: {
    orderNo: 90000,
    icon: 'whh:paintroll',
    title: 'routes.demo.setup.page',
    root: true,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'index',
      name: 'SetupDemoPage',
      component: () => import('@/pages/demo/setup/setup.vue'),
      meta: {
        title: 'routes.demo.setup.page',
        icon: 'whh:paintroll',
        hideMenu: true,
      },
    },
  ],
}

export default setup
