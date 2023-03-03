declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, any> {
    [key: string]: any

    title: string
    // icon
    icon?: string
    // Whether to ignore permissions
    ignoreAuth?: boolean
    // role info
    allowRoles?: string[]
    // is it fixed on tab
    affix?: boolean
    // Whether the route has been dynamically added
    hideBreadcrumb?: boolean
    // Never show in menu
    hideMenu?: boolean
    //隐藏子菜单
    hideChildrenInMenu?: boolean
    //菜单排序
    orderNo?: number
  }
}

export {}
