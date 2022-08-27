import { LAYOUT } from '../basic'

const dashboard: RouteRecordItem = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: 'routes.dashboard.dashboard',
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('@/pages/dashboard/analysis/index.vue'),
      meta: {
        title: 'routes.dashboard.analysis',
        icon: 'ion:grid-outline',
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('@/pages/dashboard/workbench/index.vue'),
      meta: {
        title: 'routes.dashboard.workbench',
        icon: 'ion:grid-outline',
      },
    },
  ],
}

export default dashboard
