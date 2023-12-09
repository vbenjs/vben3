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
    {
      path: 'click-out-side',
      name: 'ClickOutSideDemo',
      component: () => import('@/pages/demo/feat/click-out-side.vue'),
      meta: {
        title: 'routes.demo.feat.clickOutSide',
      },
    },
    {
      path: 'print',
      name: 'Print',
      component: () => import('@/pages/demo/feat/print.vue'),
      meta: {
        title: 'routes.demo.feat.print',
      },
    },
    {
      path: 'ellipsis',
      name: 'Ellipsis',
      component: () => import('@/pages/demo/feat/ellipsis.vue'),
      meta: {
        title: 'routes.demo.feat.ellipsis',
      },
    },
    {
      path: 'watermark',
      name: 'Watermark',
      component: () => import('@/pages/demo/feat/watermark.vue'),
      meta: {
        title: 'routes.demo.feat.watermark',
      },
    },
  ],
}

export default feat
