<script lang="ts" setup>
import { useAppConfig } from '@vben/hooks'

import { RouteLocationMatched, useRouter } from 'vue-router'
import {ref, unref, watchEffect} from 'vue'
import { useI18n } from '@vben/locale'
import { useGo } from '@vben/hooks'
import { filterTree, isString } from '@vben/utils'
import { REDIRECT_NAME } from '@vben/constants'
import { VbenIconify } from '@vben/vbencomponents'
import { Menu } from '@vben/types'
import {renderIcon} from "../render"
import {getAllParentPath, getMenus} from "@vben/router";

const { header } = useAppConfig()

const { currentRoute } = useRouter()
const { t } = useI18n()
const go = useGo()

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
  const matched: Menu[] = []

  menus.forEach((item) => {
    if (parent.includes(item.path)) {
      matched.push(item)
    }

    if (item.children?.length) {
      matched.push(...getMatched(item.children, parent))
    }
  })
  return matched
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

const renderDropdownIcon = (option) => {
  return unref(header).showBreadCrumbIcon && option.icon ? renderIcon(option.icon)() : null
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
  <VbenBreadcrumb v-if="header.showBreadCrumb" class="grid-center">
    <VbenBreadcrumbItem v-for="(route, index) in routes" :key="index">
      <VbenDropdown
        key-field="path"
        size="small"
        :options="route.children"
        :render-label="renderDropdownLabel"
        :render-icon="renderDropdownIcon"
        @select="handleClick"
      >
        <VbenSpace align="center" :size="0">
          <VbenIconify
            class="v-middle"
            :icon="route.icon"
            v-if="route.icon && header.showBreadCrumbIcon"
          />
          <span class="mr-1.2 ml-1.2">{{ t(route.meta.title) }}</span>
          <VbenIconify icon="gridicons:dropdown" v-if="route.children" />
        </VbenSpace>
      </VbenDropdown>
    </VbenBreadcrumbItem>
  </VbenBreadcrumb>
</template>
