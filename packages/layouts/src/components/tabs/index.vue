<script lang="ts" setup>
import type { RouteLocationNormalized, RouteMeta } from 'vue-router'
import { useRouter } from 'vue-router'
import { computed, ref, unref, watch } from 'vue'
import { useI18n } from '@vben/locale'
import { REDIRECT_NAME } from '@vben/constants'
import { useGo } from '@vben/use'
import TabRedo from './components/TabRedo.vue'
import { context } from '../../../bridge'
const { useMultipleTabStore, listenerRouteChange, useUserStore } = context
const { t } = useI18n()
const tabStore = useMultipleTabStore()
const router = useRouter()
const userStore = useUserStore()
const go = useGo()

const activeTabRef = ref<string>('')

const getTabsState = computed(() => {
  return tabStore.getTabList.filter(
    (item) => !item.meta?.hideTab && router.hasRoute(item.name),
  )
})
const unClose = computed(() => unref(getTabsState).length === 1)

function handleClose(path: string) {
  tabStore.closeTabByKey(path, router)
}

listenerRouteChange((route) => {
  const { name } = route
  if (name === REDIRECT_NAME || !route || !userStore.getAccessToken) {
    return
  }

  const { path, fullPath, meta = {} } = route
  const { currentActiveMenu, hideTab } = meta as RouteMeta
  const isHide = !hideTab ? null : currentActiveMenu
  const p = isHide || fullPath || path
  if (activeTabRef.value !== p) {
    activeTabRef.value = p as string
  }

  if (isHide) {
    const findParentRoute = router
      .getRoutes()
      .find((item) => item.path === currentActiveMenu)

    findParentRoute &&
      tabStore.checkTab(findParentRoute as unknown as RouteLocationNormalized)
  } else {
    tabStore.checkTab(unref(route))
  }
})

watch(activeTabRef, (path) => {
  go(path, false)
})
</script>

<template>
  <VbenTabs v-model:value="activeTabRef" type="card" @close="handleClose">
    <VbenTabPane
      v-for="tab in getTabsState"
      :key="tab.query ? tab.fullPath : tab.path"
      :tab="t(tab.meta.title)"
      :name="tab.fullPath"
      :closable="!(tab && tab.meta && tab.meta.affix) && !unClose"
    />
    <template #suffix>
      <TabRedo v-if="getTabsState" />
    </template>
  </VbenTabs>
</template>
