import { LAYOUT } from '../basic'

const dashboard: RouteRecordItem = {
  path: '/demo',
  name: 'Demo',
  component: LAYOUT,
  redirect: '/dashboard/form',
  meta: {
    orderNo: 11,
    icon: 'ion:grid-outline',
    title: 'routes.demo.demo',
  },
  children: [
    {
      path: 'table',
      name: 'Table',
      component: () => import('@/pages/demo/Table.vue'),
      meta: {
        title: 'routes.demo.table',
        icon: 'ion:grid-outline',
      },
    },
    {
      path: 'form',
      name: 'Form',
      component: () => import('@/pages/demo/Form.vue'),
      meta: {
        title: 'routes.demo.form',
        icon: 'ion:grid-outline',
      },
    },
    {
      path: 'card',
      name: 'Card',
      component: () => import('@/pages/demo/Card.vue'),
      meta: {
        title: 'routes.demo.card',
        icon: 'ion:grid-outline',
      },
    },
  ],
}

export default dashboard
