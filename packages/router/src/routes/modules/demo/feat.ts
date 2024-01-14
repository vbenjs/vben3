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
    {
      path: 'full-screen',
      name: 'FullScreenDemo',
      component: () => import('@/pages/demo/feat/full-screen.vue'),
      meta: {
        title: 'routes.demo.feat.fullScreen',
      },
    },
    {
      path: 'copy',
      name: 'CopyDemo',
      component: () => import('@/pages/demo/feat/copy.vue'),
      meta: {
        title: 'routes.demo.feat.copy',
      },
    },
    {
      path: 'ws',
      name: 'WebSocket',
      component: () => import('@/pages/demo/feat/web-socket.vue'),
      meta: {
        title: 'routes.demo.feat.ws',
      },
    },
    {
      path: 'msg',
      name: 'MsgDemo',
      component: () => import('@/pages/demo/feat/msg.vue'),
      meta: {
        title: 'routes.demo.feat.msg',
      },
    },
    {
      path: 'request',
      name: 'RequestDemo',
      component: () => import('@/pages/demo/feat/request-demo.vue'),
      meta: {
        title: 'routes.demo.feat.requestDemo',
      },
    },
    {
      path: 'session-timeout',
      name: 'SessionTimeout',
      component: () => import('@/pages/demo/feat/session-timeout.vue'),
      meta: {
        title: 'routes.demo.feat.sessionTimeout',
      },
    },
    {
      path: 'icon',
      name: 'IconDemo',
      component: () => import('@/pages/demo/feat/icon.vue'),
      meta: {
        title: 'routes.demo.feat.icon',
      },
    },
    {
      path: 'context-menu',
      name: 'ContextMenuDemo',
      component: () => import('@/pages/demo/feat/context-menu.vue'),
      meta: {
        title: 'routes.demo.feat.contextMenu',
      },
    },
    {
      path: 'download',
      name: 'downloadDemo',
      component: () => import('@/pages/demo/feat/download.vue'),
      meta: {
        title: 'routes.demo.feat.download',
      },
    },
  ],
}

export default feat
