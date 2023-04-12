import type { RouteLocationNormalized, RouteRecordNormalized, RouteRecordRaw } from 'vue-router'
export function getRawRoute(
  route: RouteLocationNormalized,
): RouteLocationNormalized {
  if (!route) return route
  const { matched, ...opt } = route
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  }
}

/**
 * 从模块对象中加载路由配置并加入到路由集合中
 * Load route configurations from modules and add them to a route collection
 *
 * @param modules 包含模块的对象 Object containing modules
 * @returns 加载后的路由配置数组 Loaded route configuration array
 */
export function loadRoutesFromModules(modules: Record<string, { default: any }>): RouteRecordRaw[] {
  // 创建一个空数组用于存储路由配置 Create an empty array to store route configurations
  const routeModuleList: RouteRecordRaw[] = [];
  Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    // 如果当前模块的默认导出是一个数组，则将其展开并添加到路由配置数组中，否则直接将其添加到数组中
    // If the default export of the current module is an array, expand it and add it to the route configuration array; otherwise, add it directly to the array
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
  });

  // 返回路由配置数组 Return the route configuration array
  return routeModuleList;
}
