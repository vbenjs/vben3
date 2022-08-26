import { LAYOUT } from '@/router/routes/basic'
import { t } from '@vben/locale'
const dashboard: RouteRecordItem = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis/child',
  meta: {
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.dashboard'),
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      // component: () => import('@/pages/dashboard/analysis/index.vue'),
      meta: {
        title: t('routes.dashboard.analysis'),
      },
      children: [
        {
          path: 'child',
          name: 'AnalysisChild',
          component: () => import('@/pages/dashboard/analysis/index.vue'),
          meta: {
            title: t('routes.dashboard.analysis'),
          },
        },
        {
          path: 'workbench',
          name: 'Workbench',
          component: () => import('@/pages/dashboard/workbench/index.vue'),
          meta: {
            title: t('routes.dashboard.workbench'),
          },
        },
      ],
    },
    // {
    //   path: 'analysi1s',
    //   name: 'Analysis1',
    //   component: () => import('@/pages/dashboard/analysis/index.vue'),
    //   meta: {
    //     title: t('routes.dashboard.analysis'),
    //     allowRoles: ['user'],
    //   },
    // },
  ],
}

export default dashboard
