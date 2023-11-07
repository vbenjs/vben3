import {
  resultSuccess,
  resultError,
  getRequestToken,
  requestParams,
} from '@vben/utils/mock-util'
import { MockMethod } from 'vite-plugin-mock'
import { createFakeUserList } from './auth'

// single
const dashboardRoute = {
  path: '/dashboard',
  name: 'Dashboard',
  component: 'LAYOUT',
  redirect: '/dashboard/analysis',
  meta: {
    title: 'routes.dashboard.dashboard',
    icon: 'mdi:monitor-dashboard',
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: '/pages/dashboard/analysis/index',
      meta: {
        title: 'routes.dashboard.analysis',
        icon: 'icon-park-outline:analysis',
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: '/pages/dashboard/workbench/index',
      meta: {
        title: 'routes.dashboard.workbench',
        icon: 'icon-park-outline:workbench',
      },
    },
  ],
}

const backRoute = {
  path: 'back',
  name: 'PermissionBackDemo',
  meta: {
    title: 'routes.demo.permission.back',
  },

  children: [
    {
      path: 'page',
      name: 'BackAuthPage',
      component: '/pages/demo/permission/back/index',
      meta: {
        title: 'routes.demo.permission.backPage',
      },
    },
    {
      path: 'btn',
      name: 'BackAuthBtn',
      component: '/pages/demo/permission/back/Btn',
      meta: {
        title: 'routes.demo.permission.backBtn',
      },
    },
  ],
}

const authRoute = {
  path: '/permission',
  name: 'Permission',
  component: 'LAYOUT',
  redirect: '/permission/front/page',
  meta: {
    icon: 'carbon:user-role',
    title: 'routes.demo.permission.permission',
  },
  children: [backRoute],
}

const multiLevelRoute = {
  path: '/multiLevel',
  name: 'MultiLevel',
  component: 'LAYOUT',
  redirect: '/multiLevel/level1',
  meta: {
    icon: 'tabler:frame-off',
    title: 'routes.demo.multiLevel.multiLevel',
  },

  children: [
    {
      path: 'menu1',
      name: 'Menu1Demo',
      meta: {
        icon: 'tabler:frame-off',
        title: 'Menu1',
      },
      children: [
        {
          path: 'menu1-1',
          name: 'Menu11Demo',
          meta: {
            title: 'Menu1-1',
          },
          children: [
            {
              path: 'menu1-1-1',
              name: 'Menu111Demo',
              component: '/pages/demo/page/index',
              meta: {
                title: 'Menu111',
              },
            },
          ],
        },
        {
          path: 'menu1-2',
          name: 'Menu12Demo',
          component: '/pages/demo/page/index',
          meta: {
            title: 'Menu1-2',
          },
        },
      ],
    },
    {
      path: 'menu2',
      name: 'Menu2Demo',
      component: '/pages/demo/page/index',
      meta: {
        title: 'Menu2',
      },
    },
  ],
}

const sysRoute = {
  path: '/system',
  name: 'System',
  component: 'LAYOUT',
  redirect: '/system/account',
  meta: {
    icon: 'ion:settings-outline',
    title: 'routes.demo.system.moduleName',
  },
  children: [
    {
      path: 'account',
      name: 'AccountManagement',
      meta: {
        title: 'routes.demo.system.account',
        ignoreKeepAlive: true,
        // hideMenu: true,
      },
      component: '/pages/demo/system/account/index',
    },
    // {
    //   path: 'account_detail/:id',
    //   name: 'AccountDetail',
    //   meta: {
    //     title: 'routes.demo.system.account_detail',
    //     ignoreKeepAlive: true,
    //     hideMenu: true,
    //   },
    //   component: '/pages/demo/system/account/AccountDetail',
    // },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: 'routes.demo.system.role',
        ignoreKeepAlive: true,
      },
      component: '/pages/demo/system/role/index',
    },
    {
      path: 'menu',
      name: 'MenuManagement',
      meta: {
        title: 'routes.demo.system.menu',
        ignoreKeepAlive: true,
      },
      component: '/pages/demo/system/menu/index',
    },
    {
      path: 'dept',
      name: 'DeptManagement',
      meta: {
        title: 'routes.demo.system.dept',
        ignoreKeepAlive: true,
      },
      component: '/pages/demo/system/dept/index',
    },
    {
      path: 'changePassword',
      name: 'ChangePassword',
      meta: {
        title: 'routes.demo.system.password',
        ignoreKeepAlive: true,
      },
      component: '/pages/demo/system/password/index',
    },
  ],
}

const linkRoute = {
  path: '/link',
  name: 'Link',
  component: 'LAYOUT',
  meta: {
    icon: 'ion:tv-outline',
    title: 'routes.demo.iframe.frame',
  },
  children: [
    {
      path: 'doc',
      name: 'Doc',
      meta: {
        title: 'routes.demo.iframe.doc',
        frameSrc: 'https://doc.vvbin.cn/',
      },
    },
    {
      path: 'https://doc.vvbin.cn/',
      name: 'DocExternal',
      component: 'LAYOUT',
      meta: {
        title: 'routes.demo.iframe.docExternal',
      },
    },
  ],
}

export default [
  {
    url: '/basic-api/getMenuList',
    timeout: 1000,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('Invalid token!')
      }
      const checkUser = createFakeUserList().find(
        (item) => item.accessToken === token,
      )
      if (!checkUser) {
        return resultError('Invalid user token!')
      }
      const id = checkUser.userId
      let menu: Object[]
      switch (id) {
        case '1':
          dashboardRoute.redirect =
            dashboardRoute.path + '/' + dashboardRoute.children[0].path
          menu = [
            dashboardRoute,
            authRoute,
            multiLevelRoute,
            linkRoute,
            sysRoute,
          ]
          break
        case '2':
          dashboardRoute.redirect =
            dashboardRoute.path + '/' + dashboardRoute.children[1].path
          menu = [dashboardRoute, authRoute, multiLevelRoute, linkRoute]
          break
        default:
          menu = []
      }

      return resultSuccess(menu)
    },
  },
] as MockMethod[]
