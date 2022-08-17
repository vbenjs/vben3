import { LAYOUT } from '@/router/routes/basic'
import { t } from '@vben/locale'
const demo: RouteRecordItem = {
  path: '/demo',
  name: 'Demo',
  component: LAYOUT,
  redirect: '/demo/card',
  meta: {
    icon: 'ion:grid-outline',
    title: '演示',
  },
  children: [
    {
      path: 'card',
      name: 'Card',
      component: () => import('@/pages/demo/Card.vue'),
      meta: {
        title: '卡片',
      },
    },
  ],
}

export default demo
