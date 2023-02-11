import { LAYOUT } from '@vben/router'

const test: RouteRecordItem = {
  path: '/test',
  name: 'Test',
  component: LAYOUT,
  redirect: '/test/test',
  meta: {
    orderNo: 1,
    icon: 'mdi:monitor-dashboard',
    title: '测试',
  },
  children: [
    {
      path: 'test',
      name: 'TTTT',
      component: () => import('@/pages/dashboard/analysis/index.vue'),
      meta: {
        icon: 'mdi:monitor-dashboard',
        title: 'Test',
      },
    },
  ],
}

export default test
