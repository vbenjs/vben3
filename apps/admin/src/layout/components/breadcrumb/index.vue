<script lang="ts" setup>
import { RouteLocationMatched, useRouter } from 'vue-router'
import { ref, watchEffect } from 'vue'
import { useI18n } from '@vben/locale'
import { useGo } from '@vben/use'
import { filterTree, isString } from '@vben/utils'
import { getAllParentPath, getMenus } from '@/router'
import { REDIRECT_NAME } from '@vben/constants'
import { Menu } from '@/types'
import { useRootSetting } from '@/hooks/useRootSetting'

withDefaults(defineProps<{ theme: 'dark' | 'light' }>(), {
  theme: 'light',
})

const { currentRoute } = useRouter()
const { t } = useI18n()
const go = useGo()
const { getShowBreadCrumbIcon } = useRootSetting()

const routes = ref<RouteLocationMatched[]>([])

watchEffect(async () => {
  if (currentRoute.value.name === REDIRECT_NAME) return
  const menus = await getMenus()

  const routeMatched = currentRoute.value.matched
  const cur = routeMatched?.[routeMatched.length - 1]
  let path = currentRoute.value.path

  if (cur && cur?.meta?.currentActiveMenu) {
    path = cur.meta.currentActiveMenu as string
  }

  const parent = getAllParentPath(menus, path)
  const filterMenus = menus.filter((item) => item.path === parent[0])
  const matched = getMatched(filterMenus, parent) as any

  if (!matched || matched.length === 0) return

  const breadcrumbList = filterItem(matched)

  if (currentRoute.value.meta?.currentActiveMenu) {
    breadcrumbList.push({
      ...currentRoute.value,
      name: currentRoute.value.name,
    } as unknown as RouteLocationMatched)
  }
  routes.value = breadcrumbList
})

function getMatched(menus: Menu[], parent: string[]) {
  const metched: Menu[] = []
  menus.forEach((item) => {
    if (parent.includes(item.path)) {
      metched.push(item)
    }
    if (item.children?.length) {
      metched.push(...getMatched(item.children, parent))
    }
  })
  return metched
}

function filterItem(list: RouteLocationMatched[]) {
  return filterTree(list, (item) => {
    const { meta, name } = item
    if (!meta) {
      return !!name
    }
    const { title, hideBreadcrumb, hideMenu } = meta
    if (!title || hideBreadcrumb || hideMenu) {
      return false
    }
    return true
  }).filter((item) => !item.meta?.hideBreadcrumb)
}

const renderDropdownLabel = (route: any) => {
  return t(route.title)
}

const renderDropdownIcon = () => {
  return getShowBreadCrumbIcon ? '' : null
}

const handleClick = (path: string, route: Recordable<any>) => {
  const { children, redirect, meta } = route

  if (children?.length && !redirect) {
    return
  }
  if (meta?.carryParam) {
    return
  }

  if (redirect && isString(redirect)) {
    go(redirect)
  } else {
    path = /^\//.test(path) ? path : `/${path}`
    go(path)
  }
}
</script>

<template>
  <VbenSpace class="h-10 items-center" justify="space-between">
    <VbenBreadcrumb>
      <VbenBreadcrumbItem v-for="(route, index) in routes" :key="index"
        ><VbenDropdown
          key-field="path"
          size="small"
          :options="route.children"
          :render-label="renderDropdownLabel"
          :render-icon="renderDropdownIcon"
          @select="handleClick"
        >
          {{ t(route.meta.title as string) }}
        </VbenDropdown>
      </VbenBreadcrumbItem>
    </VbenBreadcrumb>
  </VbenSpace>
</template>
