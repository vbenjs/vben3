import {
  REDIRECT_NAME,
  PAGE_NOT_FOUND_NAME,
  BASIC_HOME_PATH,
} from '@vben/constants'
import LAYOUT from '@/layout/index.vue'
import { Redirect } from '@components/common'
import { t } from '@vben/locale'

const PARENT_LAYOUT = () => () =>
  new Promise((resolve) => {
    resolve({ name: 'ParentLayout' })
  })

// 404 on a page
const PAGE_NOT_FOUND_ROUTE: RouteRecordItem = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
  },
  children: [
    {
      path: '/:path(.*)*',
      name: PAGE_NOT_FOUND_NAME,
      component: () => import('@/pages/sys/exception/index.vue'),
      meta: {
        title: 'ErrorPage',
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
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      component: Redirect,
      meta: {
        title: REDIRECT_NAME,
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

export {
  LAYOUT,
  PARENT_LAYOUT,
  PAGE_NOT_FOUND_ROUTE,
  REDIRECT_ROUTE,
  ROOT_ROUTE,
  LOGIN_ROUTE,
}
