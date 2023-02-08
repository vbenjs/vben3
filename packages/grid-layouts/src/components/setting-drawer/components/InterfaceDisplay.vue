<script lang="ts" setup>
import SwitchItem from './SwitchItem.vue'
import { HandlerSettingEnum } from '@vben/constants'
import { useI18n } from '@vben/locale'
import {
  useHeaderSettingStore,
  useMenuSettingStore,
  useMultiTabsSettingStore,
  useSporadicSettingStore,
} from '../../../store'
import { storeToRefs } from 'pinia'

const { t } = useI18n()

const {
  isMixSidebar,
  show: showMenu,
  isHorizontal,
} = storeToRefs(useMenuSettingStore())
const {
  showBreadCrumb,
  showBreadCrumbIcon,
  showLogo,
  showFooter,
  fullContent,
  grayMode,
  colorWeak,
} = storeToRefs(useSporadicSettingStore())
const {
  show: showMultiTabs,
  showRedo,
  showQuick,
  showFold,
} = storeToRefs(useMultiTabsSettingStore())
const { show: showHeader } = storeToRefs(useHeaderSettingStore())
</script>
<template>
  <VbenSpace vertical>
    <SwitchItem
      :title="t('layout.setting.header')"
      :def="showHeader"
      :event="HandlerSettingEnum.HEADER_SHOW"
    />
    <SwitchItem
      :title="t('layout.setting.breadcrumb')"
      :def="showBreadCrumb"
      :event="HandlerSettingEnum.SHOW_BREADCRUMB"
      :disabled="!showHeader"
    />
    <SwitchItem
      :title="t('layout.setting.breadcrumbIcon')"
      :def="showBreadCrumbIcon"
      :event="HandlerSettingEnum.SHOW_BREADCRUMB_ICON"
      :disabled="!showBreadCrumb || !showHeader"
    />
    <SwitchItem
      :title="t('layout.setting.sidebar')"
      :def="showMenu"
      :event="HandlerSettingEnum.MENU_SHOW_SIDEBAR"
      :disabled="isHorizontal"
    />
    <SwitchItem
      title="Logo"
      :def="showLogo"
      :event="HandlerSettingEnum.SHOW_LOGO"
      :disabled="isMixSidebar"
    />
    <SwitchItem
      :title="t('layout.setting.tabs')"
      :def="showMultiTabs"
      :event="HandlerSettingEnum.TABS_SHOW"
    />
    <SwitchItem
      :title="t('layout.setting.tabsRedoBtn')"
      :def="showRedo"
      :event="HandlerSettingEnum.TABS_SHOW_REDO"
      :disabled="!showMultiTabs"
    />
    <SwitchItem
      :title="t('layout.setting.tabsQuickBtn')"
      :def="showQuick"
      :event="HandlerSettingEnum.TABS_SHOW_QUICK"
      :disabled="!showMultiTabs"
    />
    <SwitchItem
      :title="t('layout.setting.tabsFoldBtn')"
      :def="showFold"
      :event="HandlerSettingEnum.TABS_SHOW_FOLD"
      :disabled="!showMultiTabs"
    />
    <SwitchItem
      :title="t('layout.setting.footer')"
      :def="showFooter"
      :event="HandlerSettingEnum.SHOW_FOOTER"
    />
    <SwitchItem
      :title="t('layout.setting.fullContent')"
      :def="fullContent"
      :event="HandlerSettingEnum.FULL_CONTENT"
    />
    <SwitchItem
      :title="t('layout.setting.grayMode')"
      :def="grayMode"
      :event="HandlerSettingEnum.GRAY_MODE"
    />
    <SwitchItem
      :title="t('layout.setting.colorWeak')"
      :def="colorWeak"
      :event="HandlerSettingEnum.COLOR_WEAK"
    />
  </VbenSpace>
</template>
