import { LAYOUT } from '../../basic'

const MultiLevel: RouteRecordItem = {
  path: '/multiLevel',
  name: 'MultiLevel',
  component: LAYOUT,
  redirect: '/multiLevel/level1',
  meta: {
    orderNo: 4,
    title: 'routes.demo.multiLevel.multiLevel',
    icon: 'tabler:frame-off',
  },
  children: [
    {
      path: 'level1',
      name: 'Level1',
      component: () => import('@/pages/demo/page/index.vue'),
      meta: {
        title: 'Level1',
      },
      children: [
        {
          path: 'level1-1',
          name: 'Level1-1',
          component: () => import('@/pages/demo/page/index.vue'),
          meta: {
            title: 'Level1-1',
          },
          children: [
            {
              path: 'level1-1-1',
              name: 'Level1-1-1',
              component: () => import('@/pages/demo/page/index.vue'),
              meta: {
                title: 'Level1-1-1',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default MultiLevel
