<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from '@vben/locale'
import { VbenIconify, renderIcon } from '@vben/vbencomponents'
import { TabActionEnum } from '@vben/constants'
import { RouteLocationNormalized } from 'vue-router'

import { useMultipleTab } from '@vben/stores'
import { useTabs } from '@vben/hooks'
const { refreshPage, close, closeAll, closeLeft, closeRight, closeOther } =
  useTabs()

const { t } = useI18n()
const tabStore = useMultipleTab()

const props = defineProps({
  tabItem: {
    type: Object as PropType<RouteLocationNormalized>,
    default: null,
  },
})

const options = computed(
  () =>
    tabStore.getTabActions(props.tabItem)?.map((v) => {
      v.label = t(v.label)
      v.icon = renderIcon(v.icon)
      return v
    }),
)
const handleSelect = async (key) => {
  switch (key) {
    case TabActionEnum.REFRESH_PAGE:
      await refreshPage()
      break
    case TabActionEnum.CLOSE_CURRENT:
      await close(props.tabItem)
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
</script>
<template>
  <VbenDropdown
    placement="bottom-start"
    trigger="click"
    :options="options"
    :show-arrow="true"
    @select="handleSelect"
  >
    <div
      class="h-full w-32px border-l flex-center border-[var(--n-border-color)] cursor-pointer"
    >
      <VbenIconify
        icon="material-symbols:double-arrow-rounded"
        class="rotate-90"
        rotate="90deg"
      />
    </div>
  </VbenDropdown>
</template>
