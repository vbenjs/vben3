<script lang="ts" setup>
import {computed, unref} from 'vue'
import {context} from '../../../../bridge'
import {useI18n} from '@vben/locale'
import {VbenIconify} from '@vben/vbencomponents'
import {TabActionEnum} from '@vben/constants'
import {RouteLocationNormalized, useRouter} from "vue-router"
import {renderIcon} from "../../index";

const {useTabs, useMultipleTabStore} = context
const {refreshPage, close, closeAll, closeLeft, closeRight, closeOther} = useTabs()
const {t} = useI18n();

const tabStore = useMultipleTabStore();
const {currentRoute} = useRouter();

const props = defineProps({
  tabItem: {
    type: Object as PropType<RouteLocationNormalized>,
    default: null,
  },
})

const options = computed(() => {
  if (!props.tabItem) {
    return;
  }
  const {meta} = props.tabItem;
  const {path} = unref(currentRoute);

  const isCurItem = props.tabItem ? props.tabItem.path === path : false;

  // Refresh button
  const index = tabStore.getTabList.findIndex((tab) => tab.path === props.tabItem.path)
  const refreshDisabled = !isCurItem;
  // Close left
  const closeLeftDisabled = index === 0 || !isCurItem;

  const disabled = tabStore.getTabList.length === 1;

  // Close right
  const closeRightDisabled =
    !isCurItem || (index === tabStore.getTabList.length - 1 && tabStore.getLastDragEndIndex >= 0);
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
      disabled: !!meta?.affix || disabled
    },
    {
      type: 'divider',
      key: 'divider1'
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
      key: 'divider2'
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
    <div class="h-full w-32px border-l flex-center border-[var(--n-border-color)] cursor-pointer">
      <VbenIconify icon="material-symbols:double-arrow-rounded" class="rotate-90" rotate="90deg"/>
    </div>
  </VbenDropdown>
</template>
