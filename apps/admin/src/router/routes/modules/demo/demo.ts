import { LAYOUT } from '../../basic'

const dashboard: RouteRecordItem = {
  path: '/demo',
  name: 'Demo',
  component: LAYOUT,
  redirect: '/dashboard/form',
  meta: {
    orderNo: 2,
    icon: 'line-md:clipboard-list-twotone',
    title: 'routes.demo.demo',
  },
  children: [
    {
      path: 'table',
      name: 'Table',
      component: () => import('@/pages/demo/Table.vue'),
      meta: {
        title: 'routes.demo.table',
      },
    },
    {
      path: 'form',
      name: 'Form',
      component: () => import('@/pages/demo/Form.vue'),
      meta: {
        title: 'routes.demo.form',
      },
    },
    {
      path: 'card',
      name: 'Card',
      component: () => import('@/pages/demo/Card.vue'),
      meta: {
        title: 'routes.demo.card',
      },
    },
    {
      path: 'draggable',
      name: 'Draggable',
      component: () => import('@/pages/demo/Draggable.vue'),
      meta: {
        title: '拖拽',
      },
    },
  ],
}

export default dashboard
