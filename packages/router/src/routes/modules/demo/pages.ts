import { LAYOUT, getParentLayout } from '../../basic'
import { Exception, ExceptionEnum } from '../../../page'

const pages: RouteRecordItem = {
  path: '/pages',
  name: 'Pages',
  component: LAYOUT,
  redirect: '/pages/exception/403',
  meta: {
    orderNo: 5,
    title: 'routes.demo.page.page',
    icon: 'iconoir:multiple-pages-empty',
    root: true,
  },
  children: [
    // =============================result start=============================
    {
      path: 'result',
      name: 'ResultPage',
      redirect: '/pages/result/success',
      component: getParentLayout('ResultPage'),

      meta: {
        title: 'routes.demo.page.result',
      },
      children: [
        {
          path: 'success',
          name: 'ResultSuccessPage',
          component: () => import('@/pages/demo/page/result/success.vue'),
          meta: {
            title: 'routes.demo.page.resultSuccess',
          },
        },
        {
          path: 'fail',
          name: 'ResultFailPage',
          component: () => import('@/pages/demo/page/result/fail.vue'),
          meta: {
            title: 'routes.demo.page.resultFail',
          },
        },
      ],
    },
    // =============================result end=============================
    // =============================exception start=============================
    {
      path: 'exception',
      name: 'ExceptionPage',
      component: getParentLayout('ExceptionPage'),
      redirect: '/pages/exception/403',
      meta: {
        title: 'routes.demo.page.exception',
      },
      children: [
        {
          path: '403',
          name: 'PageNotAccess403',
          component: Exception,
          props: {
            status: ExceptionEnum.PAGE_NOT_ACCESS,
          },
          meta: {
            title: '403',
          },
        },
        {
          path: '404',
          name: 'PageNotFound404',
          component: Exception,
          props: {
            status: ExceptionEnum.PAGE_NOT_FOUND,
          },
          meta: {
            title: '404',
          },
        },
        {
          path: '500',
          name: 'ServiceError500',
          component: Exception,
          props: {
            status: ExceptionEnum.ERROR,
          },
          meta: {
            title: '500',
          },
        },
        {
          path: 'net-work-error',
          name: 'NetWorkError',
          component: Exception,
          props: {
            status: ExceptionEnum.NET_WORK_ERROR,
          },
          meta: {
            title: 'routes.demo.page.netWorkError',
          },
        },
        {
          path: 'not-data',
          name: 'NotData',
          component: Exception,
          props: {
            status: ExceptionEnum.PAGE_NOT_DATA,
          },
          meta: {
            title: 'routes.demo.page.notData',
          },
        },
      ],
    },
    // =============================exception end=============================
  ],
}

export default pages
