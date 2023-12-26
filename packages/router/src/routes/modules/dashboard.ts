import { LAYOUT } from '../basic'

const dashboard: RouteRecordItem = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 1,
    icon: 'mdi:monitor-dashboard',
    title: 'routes.dashboard.dashboard',
    root: true,
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('@/pages/demo/page/analysis/index.vue'),
      meta: {
        icon: 'icon-park-outline:analysis',
        title: 'routes.dashboard.analysis',
        affix: true,
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('@/pages/demo/page/workbench/index.vue'),
      meta: {
        icon: 'icon-park-outline:workbench',
        title: 'routes.dashboard.workbench',
      },
    },
  ],
}

export default dashboard
