import { LAYOUT } from '../../basic'

const dashboard: RouteRecordItem = {
  path: '/demo',
  name: 'Demo',
  component: LAYOUT,
  redirect: '/demo/form',
  meta: {
    orderNo: 2,
    icon: 'uiw:component',
    title: 'routes.demo.demo',
    root: true,
  },
  children: [
    {
      path: 'basic',
      name: 'Basic',
      component: () => import('@/pages/demo/Basic.vue'),
      meta: {
        title: 'routes.demo.basic',
      },
    },
    {
      path: 'table',
      name: 'Table',
      redirect: '/demo/form/basic',
      meta: {
        title: 'routes.demo.table.table',
      },
      children: [
        {
          path: 'basic',
          name: 'BasicDemo',
          component: () => import('@/pages/demo/table/BasicTable.vue'),
          meta: {
            title: 'routes.demo.table.basic',
          },
        },
        {
          path: 'useTable',
          name: 'UseTableDemo',
          component: () => import('@/pages/demo/table/UseTable.vue'),
          meta: {
            title: 'UseTableDemo',
          },
        },
        {
          path: 'FixedColumn',
          name: 'FixedColumn',
          component: () => import('@/pages/demo/table/FixedColumn.vue'),
          meta: {
            title: 'routes.demo.table.fixedColumn',
          },
        },
        {
          path: 'TreeTable',
          name: 'TreeTable',
          component: () => import('@/pages/demo/table/TreeTable.vue'),
          meta: {
            title: 'routes.demo.table.treeTable',
          },
        },
      ],
    },
    {
      path: 'scroll',
      name: 'ScrollDemo',
      redirect: '/demo/scroll/basic',
      meta: {
        title: 'routes.demo.scroll.scroll',
      },
      children: [
        {
          path: 'basic',
          name: 'basicScrollDemo',
          component: () => import('@/pages/demo/scroll/BasicScroll.vue'),
          meta: {
            title: 'routes.demo.scroll.basic',
          },
        },
        {
          path: 'action',
          name: 'actionScrollDemo',
          component: () => import('@/pages/demo/scroll/ActionScroll.vue'),
          meta: {
            title: 'routes.demo.scroll.action',
          },
        },
        {
          path: 'virtual',
          name: 'virtualScrollDemo',
          component: () => import('@/pages/demo/scroll/VirtualScroll.vue'),
          meta: {
            title: 'routes.demo.scroll.virtual',
          },
        },
      ],
    },

    {
      path: 'form',
      name: 'Form',
      component: () => import('@/pages/demo/Form.vue'),
      meta: {
        title: 'routes.demo.form',
      },
    },
    {
      path: 'modal',
      name: 'Modal',
      component: () => import('@/pages/demo/Modal.vue'),
      meta: {
        title: 'routes.demo.modal',
      },
    },
    {
      path: 'card',
      name: 'Card',
      component: () => import('@/pages/demo/Card.vue'),
      meta: {
        title: 'routes.demo.card',
      },
    },
    {
      path: 'draggable',
      name: 'Draggable',
      component: () => import('@/pages/demo/Draggable.vue'),
      meta: {
        title: '拖拽',
      },
    },
    {
      path: 'auto-animate',
      name: 'AutoAnimate',
      component: () => import('@/pages/demo/AutoAnimate.vue'),
      meta: {
        title: 'routes.demo.animate',
      },
    },
    {
      path: 'strength-meter',
      name: 'StrengthMeter',
      component: () => import('@/pages/demo/StrengthMeter.vue'),
      meta: {
        title: 'routes.demo.strength',
      },
    },
    {
      path: 'transition',
      name: 'Transition',
      component: () => import('@/pages/demo/Transition.vue'),
      meta: {
        title: 'routes.demo.transition',
      },
    },
    {
      path: 'qrcode',
      name: 'qrcode',
      component: () => import('@/pages/demo/QrCode.vue'),
      meta: {
        title: 'routes.demo.qrcode',
      },
    },
    {
      path: 'countTo',
      name: 'CountTo',
      component: () => import('@/pages/demo/CountTo.vue'),
      meta: {
        title: 'routes.demo.countTo',
      },
    },
    {
      path: 'time',
      name: 'Time',
      component: () => import('@/pages/demo/Time.vue'),
      meta: {
        title: 'routes.demo.time',
      },
    },
    {
      path: 'cropper',
      name: 'Cropper',
      component: () => import('@/pages/demo/Cropper.vue'),
      meta: {
        title: 'routes.demo.cropperImage',
      },
    },
    {
      path: 'desc',
      name: 'Desc',
      component: () => import('@/pages/demo/Desc.vue'),
      meta: {
        title: 'routes.demo.desc',
      },
    },
  ],
}

export default dashboard
