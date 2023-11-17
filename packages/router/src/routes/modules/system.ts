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
        icon: 'majesticons:menu',
        title: t('routes.demo.system.menu'),
        affix: true,
      },
    },
    {
      path: 'account',
      name: 'Account',
      component: () => import('@/pages/demo/system/account/index.vue'),
      meta: {
        icon: 'mdi:account',
        title: t('routes.demo.system.account'),
        affix: true,
      },
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('@/pages/demo/system/role/index.vue'),
      meta: {
        icon: 'carbon:user-role',
        title: t('routes.demo.system.role')
      }
    }
  ],
}

export default system
