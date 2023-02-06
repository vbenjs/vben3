<script lang="ts" setup>
import { computed, unref } from 'vue'
import SwitchItem from './SwitchItem.vue'
import SelectItem from './SelectItem.vue'
import InputNumberItem from './InputNumberItem.vue'
import { HandlerSettingEnum } from '@vben/constants'
import {
  mixSidebarTriggerOptions,
  topMenuAlignOptions,
  getMenuTriggerOptions,
  contentModeOptions,
} from '../../../logics/constant'
import { useI18n } from '@vben/locale'
import {
  useHeaderSettingStore,
  useMenuSettingStore,
  useSporadicSettingStore,
} from '../../../store'
import { storeToRefs } from '@vben/pinia'

const { t } = useI18n()

const {
  isHorizontal,
  hidden: sidebarHidden,
  split,
  isMix,
  mixSideFixed,
  fixed: menuFixed,
  isMixSidebar,
  isTopMenu,
  closeMixSidebarOnChange,
  collapsed,
  canDrag,
  accordion,
  collapsedShowTitle,
  mixSideTrigger,
  topMenuAlign,
  trigger,
  menuWidth,
} = storeToRefs(useMenuSettingStore())
const {
  showSearch,
  show: showHeader,
  fixed: headerFixed,
} = storeToRefs(useHeaderSettingStore())
const { contentMode, lockTime } = storeToRefs(useSporadicSettingStore())
const triggerOptions = getMenuTriggerOptions(unref(split))
const getMenuDisabled = computed(() => {
  return !isHorizontal && !sidebarHidden
})
</script>
<template>
  <VbenSpace vertical>
    <SwitchItem
      :title="t('layout.setting.splitMenu')"
      :def="split"
      :event="HandlerSettingEnum.MENU_SPLIT"
      :disabled="!isMix"
    />
    <SwitchItem
      :title="t('layout.setting.mixSidebarFixed')"
      :def="mixSideFixed"
      :event="HandlerSettingEnum.MENU_FIXED_MIX_SIDEBAR"
      :disabled="!isMixSidebar"
    />
    <SwitchItem
      :title="t('layout.setting.closeMixSidebarOnChange')"
      :def="closeMixSidebarOnChange"
      :event="HandlerSettingEnum.MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE"
      :disabled="!isMixSidebar"
    />
    <SwitchItem
      :title="t('layout.setting.menuCollapse')"
      :def="collapsed"
      :event="HandlerSettingEnum.MENU_COLLAPSED"
      :disabled="!getMenuDisabled"
    />
    <SwitchItem
      :title="t('layout.setting.menuDrag')"
      :def="canDrag"
      :event="HandlerSettingEnum.MENU_HAS_DRAG"
      :disabled="!getMenuDisabled"
    />
    <SwitchItem
      :title="t('layout.setting.menuSearch')"
      :def="showSearch"
      :event="HandlerSettingEnum.HEADER_SEARCH"
      :disabled="!showHeader"
    />
    <SwitchItem
      :title="t('layout.setting.menuAccordion')"
      :def="accordion"
      :event="HandlerSettingEnum.MENU_ACCORDION"
      :disabled="!getMenuDisabled"
    />
    <SwitchItem
      :title="t('layout.setting.collapseMenuDisplayName')"
      :def="collapsedShowTitle"
      :event="HandlerSettingEnum.MENU_COLLAPSED_SHOW_TITLE"
      :disabled="!getMenuDisabled || !collapsed || isMixSidebar"
    />
    <SwitchItem
      :title="t('layout.setting.fixedHeader')"
      :def="headerFixed"
      :event="HandlerSettingEnum.HEADER_FIXED"
      :disabled="!showHeader"
    />
    <SwitchItem
      :title="t('layout.setting.fixedSideBar')"
      :def="menuFixed"
      :event="HandlerSettingEnum.MENU_FIXED"
      :disabled="!getMenuDisabled || isMixSidebar"
    />
    <SelectItem
      :title="t('layout.setting.mixSidebarTrigger')"
      :options="mixSidebarTriggerOptions"
      :def="mixSideTrigger"
      :event="HandlerSettingEnum.MENU_TRIGGER_MIX_SIDEBAR"
      :disabled="!isMixSidebar"
    />
    <SelectItem
      :title="t('layout.setting.topMenuLayout')"
      :options="topMenuAlignOptions"
      :def="topMenuAlign"
      :event="HandlerSettingEnum.MENU_TOP_ALIGN"
      :disabled="!showHeader || split || (!isTopMenu && !split) || isMixSidebar"
    />
    <SelectItem
      :title="t('layout.setting.menuCollapseButton')"
      :options="triggerOptions"
      :def="trigger"
      :event="HandlerSettingEnum.MENU_TRIGGER"
      :disabled="isMixSidebar || isTopMenu || (isMix && isHorizontal)"
    />
    <SelectItem
      :title="t('layout.setting.contentMode')"
      :options="contentModeOptions"
      :def="contentMode"
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
      :def="menuWidth"
      suffix="px"
      :event="HandlerSettingEnum.MENU_WIDTH"
      :disabled="!getMenuDisabled"
    />
  </VbenSpace>
</template>
