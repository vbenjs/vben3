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

    // =============================account start=============================
    {
      path: 'account',
      name: 'AccountPage',
      redirect: '/pages/account/center',
      component: getParentLayout('AccountPage'),

      meta: {
        title: 'routes.demo.page.account',
      },
      children: [
        {
          path: 'center',
          name: 'AccountCenterPage',
          component: () => import('@/pages/demo/page/account/center/index.vue'),
          meta: {
            title: 'routes.demo.page.accountCenter',
          },
        },
        {
          path: 'setting',
          name: 'AccountSettingPage',
          component: () =>
            import('@/pages/demo/page/account/setting/index.vue'),
          meta: {
            title: 'routes.demo.page.accountSetting',
          },
        },
      ],
    },
    // =============================account end=============================

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
    // =============================desc start=============================
    {
      path: 'desc',
      name: 'DescPage',
      component: getParentLayout('DescPage'),
      redirect: '/pages/desc/basic',
      meta: {
        title: 'routes.demo.page.desc',
      },
      children: [
        {
          path: 'basic',
          name: 'DescBasicPage',
          component: () => import('@/pages/demo/page/desc/basic/index.vue'),
          meta: {
            title: 'routes.demo.page.descBasic',
          },
        },
        {
          path: 'high',
          name: 'DescHighPage',
          component: () => import('@/pages/demo/page/desc/high/index.vue'),
          meta: {
            title: 'routes.demo.page.descHigh',
          },
        },
      ],
    },
    // =============================desc end=============================
  ],
}

export default pages
