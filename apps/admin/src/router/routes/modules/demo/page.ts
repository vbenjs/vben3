const Page: RouteRecordItem = {
  path: '/pageTest',
  name: 'PageTest',
  component: () => import('@/pages/demo/page/index.vue'),
  meta: {
    orderNo: 4,
    title: '非框架页面',
    hideTab: true
  },
}

export default Page
