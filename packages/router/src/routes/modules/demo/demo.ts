import { LAYOUT } from '../../basic'

const dashboard: RouteRecordItem = {
  path: '/demo',
  name: 'Demo',
  component: LAYOUT,
  redirect: '/demo/form',
  meta: {
    orderNo: 2,
    icon: 'line-md:clipboard-list-twotone',
    title: 'routes.demo.demo',
    root: true,
  },
  children: [
    {
      path: 'table',
      name: 'Table',
      redirect: '/demo/form/basic',
      meta: {
        title: 'routes.demo.table.table',
      },
      children: [
        {
          path: 'useTable',
          name: 'UseTableDemo',
          component: () => import('@/pages/demo/table/BasicTable.vue'),
          meta: {
            title: 'routes.demo.table.basic',
          },
        },
      ],
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
