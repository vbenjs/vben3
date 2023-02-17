<script lang="ts" setup>
import SwitchItem from './SwitchItem.vue'
import SelectItem from './SelectItem.vue'
import InputNumberItem from './InputNumberItem.vue'
import { HandlerSettingEnum } from '@vben/constants'
import {
  mixSidebarTriggerOptions,
  topMenuAlignOptions,
  contentModeOptions,
  getMenuTriggerOptions,
} from '../../constant'
import { useI18n } from '@vben/locale'
import { useAppConfig } from '@vben/hooks'

const { t } = useI18n()

const {
  header,
  sidebar,
  isHorizontal,
  isMixSidebar,
  isTopMenu,
  content,
  isMix,
  menu,
  lockTime,
  closeMixSidebarOnChange,
} = useAppConfig()

const triggerOptions = getMenuTriggerOptions(menu.split)
</script>
<template>
  <VbenSpace vertical>
    <SwitchItem
      :title="t('layout.setting.splitMenu')"
      :def="menu.split"
      :event="HandlerSettingEnum.MENU_SPLIT"
      :disabled="!isMix"
    />
    <SwitchItem
      :title="t('layout.setting.mixSidebarFixed')"
      :def="menu.mixSideFixed"
      :event="HandlerSettingEnum.MENU_FIXED_MIX_SIDEBAR"
      :disabled="!isMixSidebar"
    />
    <SwitchItem
      v-if="false"
      :title="t('layout.setting.closeMixSidebarOnChange')"
      :def="closeMixSidebarOnChange"
      :event="HandlerSettingEnum.MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE"
      :disabled="!isMixSidebar"
    />
    <SwitchItem
      :title="t('layout.setting.menuCollapse')"
      :def="sidebar.collapsed"
      :event="HandlerSettingEnum.MENU_COLLAPSED"
      :disabled="isTopMenu"
    />
    <SwitchItem
      :title="t('layout.setting.menuDrag')"
      :def="menu.canDrag"
      :event="HandlerSettingEnum.MENU_HAS_DRAG"
      :disabled="!sidebar.visible"
    />
    <SwitchItem
      :title="t('layout.setting.menuSearch')"
      :def="header.showSearch"
      :event="HandlerSettingEnum.HEADER_SEARCH"
      :disabled="!header.visible"
    />
    <SwitchItem
      :title="t('layout.setting.menuAccordion')"
      :def="menu.accordion"
      :event="HandlerSettingEnum.MENU_ACCORDION"
      :disabled="!sidebar.visible || isHorizontal || isTopMenu"
    />
    <SwitchItem
      :title="t('layout.setting.collapseMenuDisplayName')"
      :def="menu.collapsedShowTitle"
      :event="HandlerSettingEnum.MENU_COLLAPSED_SHOW_TITLE"
      :disabled="!sidebar.collapsed || !sidebar.visible || isMixSidebar"
    />
    <SwitchItem
      v-if="false"
      :title="t('layout.setting.fixedHeader')"
      :def="header.fixed"
      :event="HandlerSettingEnum.HEADER_FIXED"
      :disabled="!header.visible"
    />
    <SwitchItem
      v-if="false"
      :title="t('layout.setting.fixedSideBar')"
      :def="sidebar.fixed"
      :event="HandlerSettingEnum.MENU_FIXED"
      :disabled="!sidebar.show || isHorizontal || isMixSidebar"
    />
    <SelectItem
      :title="t('layout.setting.mixSidebarTrigger')"
      :options="mixSidebarTriggerOptions"
      :def="menu.mixSideTrigger"
      :event="HandlerSettingEnum.MENU_TRIGGER_MIX_SIDEBAR"
      :disabled="!isMixSidebar"
    />
    <SelectItem
      :title="t('layout.setting.topMenuLayout')"
      :options="topMenuAlignOptions"
      :def="menu.topMenuAlign"
      :event="HandlerSettingEnum.MENU_TOP_ALIGN"
      :disabled="!(isTopMenu || (isMix && menu.split))"
    />
    <SelectItem
      :title="t('layout.setting.menuCollapseButton')"
      :options="triggerOptions"
      :def="sidebar.trigger"
      :event="HandlerSettingEnum.MENU_TRIGGER"
      :disabled="isMixSidebar || isTopMenu || (isMix && isHorizontal)"
    />
    <SelectItem
      :title="t('layout.setting.contentMode')"
      :options="contentModeOptions"
      :def="content.mode"
      :event="HandlerSettingEnum.CONTENT_MODE"
    />
    <InputNumberItem
      :title="t('layout.setting.autoScreenLock')"
      :min="0"
      :def="lockTime"
      :event="HandlerSettingEnum.LOCK_TIME"
      :suffix="
        lockTime === 0
          ? t('layout.setting.notAutoScreenLock')
          : t('layout.setting.minute')
      "
    />
    <InputNumberItem
      :title="t('layout.setting.expandedMenuWidth')"
      :min="100"
      :max="240"
      :step="10"
      :def="sidebar.width"
      suffix="px"
      :event="HandlerSettingEnum.MENU_WIDTH"
      :disabled="!sidebar.visible"
    />
  </VbenSpace>
</template>
