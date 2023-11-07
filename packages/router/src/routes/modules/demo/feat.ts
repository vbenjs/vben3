import { LAYOUT } from '../../basic'

const feat: RouteRecordItem = {
  path: '/feat',
  name: 'Feat',
  component: LAYOUT,
  redirect: '/feat/ripple',
  meta: {
    orderNo: 4,
    title: '功能',
    icon: 'ri:function-line',
    root: true,
  },
  children: [
    {
      path: 'ripple',
      name: 'RippleDemo',
      component: () => import('@/pages/demo/feat/ripple.vue'),
      meta: {
        title: 'routes.demo.feat.ripple',
      },
    },
  ],
}

export default feat
