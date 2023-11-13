import {
  REDIRECT_NAME,
  PAGE_NOT_FOUND_NAME,
  BASIC_HOME_PATH,
} from '@vben/constants'
import { Exception, Redirect } from '../page'
import { t } from '@vben/locale'

const LAYOUT = () => import('@/layout/index.vue')

/**
 * @description: parent-layout
 */
export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: _name || 'ParentLayout',
      })
    })
}

// 404 on a page
const PAGE_NOT_FOUND_ROUTE: RouteRecordItem = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: PAGE_NOT_FOUND_NAME,
      component: Exception,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ],
}

const REDIRECT_ROUTE: RouteRecordItem = {
  path: '/redirect',
  component: LAYOUT,
  name: 'RedirectTo',
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)/:_redirect_type(.*)/:_origin_params(.*)?',
      name: REDIRECT_NAME,
      component: Redirect,
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
      },
    },
  ],
}

const ROOT_ROUTE: RouteRecordItem = {
  path: '/',
  name: 'Root',
  redirect: BASIC_HOME_PATH,
  meta: {
    title: 'Root',
  },
}

const LOGIN_ROUTE: RouteRecordItem = {
  path: '/login',
  name: 'Login',
  component: () => import('@/pages/sys/login/login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
}

const LOCK_SCREEN_ROUTE: RouteRecordItem = {
  path: '/lock',
  name: 'Lock',
  component: () => import('@/pages/sys/lock/index.vue'),
  meta: {
    title: t('routes.basic.lock'),
  },
}

export {
  LAYOUT,
  PAGE_NOT_FOUND_ROUTE,
  REDIRECT_ROUTE,
  ROOT_ROUTE,
  LOGIN_ROUTE,
  LOCK_SCREEN_ROUTE,
}
