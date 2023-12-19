import { LAYOUT } from '../basic'
import { t } from '@vben/locale'

const system: RouteRecordItem = {
  path: '/system',
  name: 'SystemManager',
  component: LAYOUT,
  redirect: '/system/user',
  meta: {
    root: true,
    icon: 'uil:setting',
    title: t('routes.demo.system.moduleName'),
    orderNo: 99,
  },
  children: [
    {
      path: 'menus',
      name: 'Menus',
      component: () => import('@/pages/demo/system/menu/index.vue'),
      meta: {
        icon: 'solar:hamburger-menu-bold-duotone',
        title: t('routes.demo.system.menu'),
      },
    },
    {
      path: 'account',
      name: 'Account',
      component: () => import('@/pages/demo/system/account/index.vue'),
      meta: {
        icon: 'solar:user-bold-duotone',
        title: t('routes.demo.system.account'),
      },
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('@/pages/demo/system/role/index.vue'),
      meta: {
        icon: 'solar:user-check-rounded-bold-duotone',
        title: t('routes.demo.system.role'),
      },
    },
    {
      path: 'dept',
      name: 'Dept',
      component: () => import('@/pages/demo/system/dept/index.vue'),
      meta: {
        icon: 'solar:suspension-bold-duotone',
        title: t('routes.demo.system.dept'),
      },
    },
    {
      path: 'password',
      name: 'Password',
      component: () => import('@/pages/demo/system/password/index.vue'),
      meta: {
        icon: 'solar:lock-password-bold-duotone',
        title: t('routes.demo.system.password'),
      },
    },
  ],
}

export default system
