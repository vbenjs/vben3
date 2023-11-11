import {LAYOUT} from '../basic'

const dashboard: RouteRecordItem = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/workbench',
  meta: {
    orderNo: 1,
    icon: 'mdi:monitor-dashboard',
    title: 'routes.dashboard.dashboard',
    root: true,
  },
  children: [
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('@/pages/dashboard/workbench/index.vue'),
      meta: {
        icon: 'icon-park-outline:workbench',
        title: 'routes.dashboard.workbench',
        affix: true,
      },
    },
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('@/pages/dashboard/analysis/index.vue'),
      meta: {
        icon: 'icon-park-outline:analysis',
        title: 'routes.dashboard.analysis',

      },
    },

  ],
}

export default dashboard
