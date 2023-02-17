<script lang="ts" setup>
import { computed, ref, unref } from 'vue'
import TabItem from './components/TabItem.vue'
import { useMultipleTab, storeToRefs } from '@vben/stores'
import { RouteLocationNormalized, RouteMeta, useRouter } from 'vue-router'
import { listenerRouteChange } from '@vben/router'
import { REDIRECT_NAME } from '@vben/constants'
import { useI18n } from '@vben/locale'
import { useGo, useTabs } from '@vben/hooks'
import TabDropdown from './components/TabDropdown.vue'
const { t } = useI18n()

const multipleTabStore = useMultipleTab()
const { getTabList } = storeToRefs(multipleTabStore)
const router = useRouter()
const activeTabName = ref<string>('')
const go = useGo()
const tabDropdownRef = ref<HTMLElement | null>(null)
const { close } = useTabs()

const tabList = computed(() => {
  return unref(getTabList).filter(
    (item) => !item.meta?.hideTab && router.hasRoute(item.name),
  )
})

listenerRouteChange((route) => {
  const { name } = route
  // TODO  Token needs to be verified !userStore.getAccessToken
  if (name === REDIRECT_NAME || !route) {
    return
  }
  const { path, fullPath, meta = {} } = route
  const { currentActiveMenu, hideTab } = meta as RouteMeta
  const isHide = !hideTab ? null : currentActiveMenu
  const p = isHide || fullPath || path
  if (activeTabName.value !== p) {
    activeTabName.value = p as string
  }

  if (isHide) {
    const findParentRoute = router
      .getRoutes()
      .find((item) => item.path === currentActiveMenu)

    findParentRoute &&
      multipleTabStore.checkTab(
        findParentRoute as unknown as RouteLocationNormalized,
      )
  } else {
    multipleTabStore.checkTab(unref(route))
  }
})
const handleContextMenu = (
  e: PointerEvent,
  tabItem: RouteLocationNormalized,
) => {
  e.preventDefault()
  if (!tabItem) return
  // @ts-ignore
  unref(tabDropdownRef)?.openDropdown(e, tabItem)
}

const handleChange = (value: string) => {
  go(value, false)
}
</script>
<template>
  <VbenTabs
    v-model:value="activeTabName"
    type="card"
    size="small"
    animated
    tab-style="--n-tab-padding: 0;"
    :tabs-padding="8"
    @update:value="handleChange"
  >
    <VbenTab
      v-for="tab in tabList"
      :key="tab.query ? tab.fullPath : tab.path"
      :name="tab.fullPath"
    >
      <TabItem
        :title="t(tab.meta.title)"
        :closable="!(tab && tab.meta && tab.meta.affix)"
        :active="activeTabName === tab.fullPath"
        @contextmenu="handleContextMenu($event, tab)"
        @close="
          () => {
            close(route)
          }
        "
      />
    </VbenTab>
  </VbenTabs>
  <TabDropdown ref="tabDropdownRef" />
</template>
