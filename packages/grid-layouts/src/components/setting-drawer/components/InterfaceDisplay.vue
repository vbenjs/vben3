<script lang="ts" setup>
import SwitchItem from './SwitchItem.vue'
import { HandlerSettingEnum } from '@vben/constants'
import { useI18n } from '@vben/locale'
import { useAppConfig } from '@vben/hooks'

const { t } = useI18n()

const {
  header,
  sidebar,
  isHorizontal,
  isMixSidebar,
  tabTar,
  footer,
  content,
  grayMode,
  colorWeak,
  logo,
} = useAppConfig()
</script>
<template>
  <VbenSpace vertical>
    <SwitchItem
      :title="t('layout.setting.header')"
      :def="header.visible"
      :event="HandlerSettingEnum.HEADER_SHOW"
    />
    <SwitchItem
      :title="t('layout.setting.breadcrumb')"
      :def="header.showBreadCrumb"
      :event="HandlerSettingEnum.SHOW_BREADCRUMB"
      :disabled="!header.visible"
    />
    <SwitchItem
      :title="t('layout.setting.breadcrumbIcon')"
      :def="header.showBreadCrumbIcon"
      :event="HandlerSettingEnum.SHOW_BREADCRUMB_ICON"
      :disabled="!header.showBreadCrumb || !header.visible"
    />
    <SwitchItem
      :title="t('layout.setting.sidebar')"
      :def="sidebar.visible"
      :event="HandlerSettingEnum.MENU_SHOW_SIDEBAR"
      :disabled="isHorizontal"
    />
    <SwitchItem
      title="Logo"
      :def="logo.visible"
      :event="HandlerSettingEnum.SHOW_LOGO"
      :disabled="isMixSidebar"
    />
    <SwitchItem
      :title="t('layout.setting.tabs')"
      :def="tabTar.visible"
      :event="HandlerSettingEnum.TABS_SHOW"
    />
    <SwitchItem
      :title="t('layout.setting.tabsRedoBtn')"
      :def="tabTar.showRedo"
      :event="HandlerSettingEnum.TABS_SHOW_REDO"
      :disabled="!tabTar.visible"
    />
    <SwitchItem
      :title="t('layout.setting.tabsQuickBtn')"
      :def="tabTar.showQuick"
      :event="HandlerSettingEnum.TABS_SHOW_QUICK"
      :disabled="!tabTar.visible"
    />
    <SwitchItem
      :title="t('layout.setting.tabsFoldBtn')"
      :def="tabTar.showFold"
      :event="HandlerSettingEnum.TABS_SHOW_FOLD"
      :disabled="!tabTar.visible"
    />
    <SwitchItem
      :title="t('layout.setting.footer')"
      :def="footer.visible"
      :event="HandlerSettingEnum.SHOW_FOOTER"
    />
    <SwitchItem
      :title="t('layout.setting.fullContent')"
      :def="content.fullScreen"
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
