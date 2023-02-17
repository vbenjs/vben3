<script lang="ts" setup>
import { computed, nextTick, ref, unref } from 'vue'
import { useI18n } from '@vben/locale'
import { TabActionEnum } from '@vben/constants'
import { RouteLocationNormalized, useRouter } from 'vue-router'
import { useTabs } from '@vben/hooks'
import { useMultipleTab } from '@vben/stores'
import { renderIcon } from '../../render'
const { refreshPage, close, closeAll, closeLeft, closeRight, closeOther } =
  useTabs()
const { t } = useI18n()
const x = ref(0)
const y = ref(0)
const targetTab = ref<RouteLocationNormalized>(null)
const showDropdown = ref(false)

const tabStore = useMultipleTab()

const { currentRoute } = useRouter()

const options = computed(() => {
  if (!unref(targetTab)) {
    return
  }
  const { meta } = unref(targetTab)
  const { path } = unref(currentRoute)

  const isCurItem = unref(targetTab) ? unref(targetTab).path === path : false

  // Refresh button
  const index = tabStore.getTabList.findIndex(
    (tab) => tab.path === unref(targetTab).path,
  )
  const refreshDisabled = !isCurItem
  // Close left
  const closeLeftDisabled = index === 0 || !isCurItem

  const disabled = tabStore.getTabList.length === 1

  // Close right
  const closeRightDisabled =
    !isCurItem ||
    (index === tabStore.getTabList.length - 1 &&
      tabStore.getLastDragEndIndex >= 0)
  return [
    {
      label: t('layout.multipleTab.reload'),
      key: TabActionEnum.REFRESH_PAGE,
      icon: renderIcon('ion:reload-sharp'),
      disabled: refreshDisabled,
    },
    {
      label: t('layout.multipleTab.close'),
      key: TabActionEnum.CLOSE_CURRENT,
      icon: renderIcon('clarity:close-line'),
      disabled: !!meta?.affix || disabled,
    },
    {
      type: 'divider',
      key: 'divider1',
    },
    {
      icon: renderIcon('line-md:arrow-close-left'),
      key: TabActionEnum.CLOSE_LEFT,
      label: t('layout.multipleTab.closeLeft'),
      disabled: closeLeftDisabled,
    },
    {
      icon: renderIcon('line-md:arrow-close-right'),
      key: TabActionEnum.CLOSE_RIGHT,
      label: t('layout.multipleTab.closeRight'),
      disabled: closeRightDisabled,
    },
    {
      type: 'divider',
      key: 'divider2',
    },
    {
      icon: renderIcon('dashicons:align-center'),
      key: TabActionEnum.CLOSE_OTHER,
      label: t('layout.multipleTab.closeOther'),
      disabled: disabled || !isCurItem,
    },
    {
      label: t('layout.multipleTab.closeAll'),
      key: TabActionEnum.CLOSE_ALL,
      icon: renderIcon('clarity:minus-line'),
      disabled: disabled,
    },
  ]
})

const openDropdown = (e: PointerEvent, tabItem: RouteLocationNormalized) => {
  targetTab.value = tabItem
  showDropdown.value = false
  nextTick().then(() => {
    showDropdown.value = true
    x.value = e.clientX
    y.value = e.clientY
  })
}
const handleSelect = async (key) => {
  switch (key) {
    case TabActionEnum.REFRESH_PAGE:
      await refreshPage()
      break
    case TabActionEnum.CLOSE_CURRENT:
      await close(unref(targetTab))
      break
    case TabActionEnum.CLOSE_ALL:
      await closeAll()
      break
    case TabActionEnum.CLOSE_LEFT:
      await closeLeft()
      break
    case TabActionEnum.CLOSE_RIGHT:
      await closeRight()
      break
    case TabActionEnum.CLOSE_OTHER:
      await closeOther()
      break
  }
}
defineExpose({ openDropdown })
</script>
<template>
  <VbenDropdown
    placement="bottom-start"
    trigger="manual"
    :show-arrow="true"
    :x="x"
    :y="y"
    :options="options"
    v-model:show="showDropdown"
    @clickoutside="showDropdown = false"
    @select="handleSelect"
  />
</template>
