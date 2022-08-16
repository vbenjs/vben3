import { LAYOUT } from '@/router/routes/basic'
import { t } from '@vben/locale'

const dashboard: RouteRecordItem = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.dashboard'),
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('@/pages/dashboard/analysis/index.vue'),
      meta: {
        title: t('routes.dashboard.analysis'),
      },
    },
    {
      path: 'analysi1s',
      name: 'Analysis1',
      component: () => import('@/pages/dashboard/analysis/index.vue'),
      meta: {
        title: t('routes.dashboard.analysis'),
        allowRoles: ['user'],
      },
    },
  ],
}

export default dashboard
