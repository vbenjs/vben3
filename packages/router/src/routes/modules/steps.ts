import { LAYOUT } from '../basic'

const steps: RouteRecordItem = {
  path: '/steps',
  name: 'StepsDemo',
  component: LAYOUT,
  redirect: '/steps/index',
  meta: {
    orderNo: 90000,
    icon: 'whh:paintroll',
    title: 'routes.demo.steps.page',
    root: true,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'index',
      name: 'StepsDemoPage',
      component: () => import('@/pages/demo/steps/steps.vue'),
      meta: {
        title: 'routes.demo.steps.page',
        icon: 'whh:paintroll',
        hideMenu: true,
      },
    },
  ],
}

export default steps
