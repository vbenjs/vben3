const Page: RouteRecordItem = {
  path: '/pageTest',
  name: 'PageTest',
  component: () => import('@/pages/demo/page/index.vue'),
  meta: {
    title: 'pageTest',
    ignoreAuth: false,
  },
}

export default Page
