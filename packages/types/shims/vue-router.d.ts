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
  }
}

export {}
