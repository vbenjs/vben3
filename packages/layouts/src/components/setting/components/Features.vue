<script lang="ts" setup>
import { computed, unref } from 'vue'
import SwitchItem from './SwitchItem.vue'
import SelectItem from './SelectItem.vue'
import InputNumberItem from './InputNumberItem.vue'
import {
  TriggerEnum,
  HandlerSettingEnum,
  NavBarModeEnum,
} from '@vben/constants'
import { context } from '../../../../bridge'
import {
  mixSidebarTriggerOptions,
  topMenuAlignOptions,
  getMenuTriggerOptions,
  contentModeOptions,
} from '../constant'
import { useI18n } from '@vben/locale'

const { t } = useI18n()

const { useMenuSetting, useHeaderSetting, useRootSetting, useAppConfig } =
  context

const { getContentMode, getLockTime } = useRootSetting()

const {
  getIsHorizontal,
  getShowMenu,
  getMenuType,
  getTrigger,
  getCollapsedShowTitle,
  getMenuFixed,
  getCollapsed,
  getCanDrag,
  getTopMenuAlign,
  getAccordion,
  getMenuWidth,
  getIsTopMenu,
  getSplit,
  getIsMixSidebar,
  getCloseMixSidebarOnChange,
  getMixSideTrigger,
  getMixSideFixed,
  setMenuSetting,
} = useMenuSetting()

const {
  getShowHeader,
  getFixed: getHeaderFixed,
  getShowSearch,
} = useHeaderSetting()

const getShowMenuRef = computed(() => {
  return unref(getShowMenu) && !unref(getIsHorizontal)
})

const triggerOptions = getMenuTriggerOptions(unref(getSplit))
const some = triggerOptions.some((item) => item.value === unref(getTrigger))
if (!some) {
  setMenuSetting({ trigger: TriggerEnum.FOOTER })
}

const { baseHandler } = useAppConfig()
const eventHandler = (evt: HandlerSettingEnum, val: boolean) => {
  baseHandler(evt, val)
}
</script>
<template>
  <VbenSpace vertical>
    <SwitchItem
      :title="t('layout.setting.splitMenu')"
      :value="getSplit"
      :callback="(v) => eventHandler(HandlerSettingEnum.MENU_SPLIT, v)"
      :disabled="!getShowMenuRef || getMenuType !== NavBarModeEnum.MIX"
    />
    <SwitchItem
      :title="t('layout.setting.mixSidebarFixed')"
      :value="getMixSideFixed"
      :callback="
        (v) => eventHandler(HandlerSettingEnum.MENU_FIXED_MIX_SIDEBAR, v)
      "
      :disabled="!getIsMixSidebar"
    />
    <SwitchItem
      :title="t('layout.setting.closeMixSidebarOnChange')"
      :value="getCloseMixSidebarOnChange"
      :callback="
        (v) =>
          eventHandler(HandlerSettingEnum.MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE, v)
      "
      :disabled="!getIsMixSidebar"
    />
    <SwitchItem
      :title="t('layout.setting.menuCollapse')"
      :value="getCollapsed"
      :callback="(v) => eventHandler(HandlerSettingEnum.MENU_COLLAPSED, v)"
      :disabled="!getShowMenuRef"
    />
    <SwitchItem
      :title="t('layout.setting.menuDrag')"
      :value="getCanDrag"
      :callback="(v) => eventHandler(HandlerSettingEnum.MENU_HAS_DRAG, v)"
      :disabled="!getShowMenuRef"
    />
    <SwitchItem
      :title="t('layout.setting.menuSearch')"
      :value="getShowSearch"
      :callback="(v) => eventHandler(HandlerSettingEnum.HEADER_SEARCH, v)"
      :disabled="!getShowHeader"
    />
    <SwitchItem
      :title="t('layout.setting.menuAccordion')"
      :value="getAccordion"
      :callback="(v) => eventHandler(HandlerSettingEnum.MENU_ACCORDION, v)"
      :disabled="!getShowMenuRef"
    />
    <SwitchItem
      :title="t('layout.setting.collapseMenuDisplayName')"
      :value="getCollapsedShowTitle"
      :callback="
        (v) => eventHandler(HandlerSettingEnum.MENU_COLLAPSED_SHOW_TITLE, v)
      "
      :disabled="!getShowMenuRef || !getCollapsed || getIsMixSidebar"
    />
    <SwitchItem
      :title="t('layout.setting.fixedHeader')"
      :value="getHeaderFixed"
      :callback="(v) => eventHandler(HandlerSettingEnum.HEADER_FIXED, v)"
      :disabled="!getShowHeader"
    />
    <SwitchItem
      :title="t('layout.setting.fixedSideBar')"
      :value="getMenuFixed"
      :callback="(v) => eventHandler(HandlerSettingEnum.MENU_FIXED, v)"
      :disabled="!getShowMenuRef || getIsMixSidebar"
    />
    <SelectItem
      :title="t('layout.setting.mixSidebarTrigger')"
      :options="mixSidebarTriggerOptions"
      :value="getMixSideTrigger"
      :event="HandlerSettingEnum.MENU_TRIGGER_MIX_SIDEBAR"
      :disabled="!getIsMixSidebar"
    />
    <SelectItem
      :title="t('layout.setting.topMenuLayout')"
      :options="topMenuAlignOptions"
      :def="getTopMenuAlign"
      :event="HandlerSettingEnum.MENU_TOP_ALIGN"
      :disabled="
        !getShowHeader ||
        getSplit ||
        (!getIsTopMenu && !getSplit) ||
        getIsMixSidebar
      "
    />
    <SelectItem
      :title="t('layout.setting.menuCollapseButton')"
      :options="triggerOptions"
      :def="getTrigger"
      :event="HandlerSettingEnum.MENU_TRIGGER"
      :disabled="!getShowMenuRef || getIsMixSidebar"
    />
    <SelectItem
      :title="t('layout.setting.contentMode')"
      :options="contentModeOptions"
      :def="getContentMode"
      :event="HandlerSettingEnum.CONTENT_MODE"
    />
    <InputNumberItem
      :title="t('layout.setting.autoScreenLock')"
      :min="0"
      :def="getLockTime"
      :event="HandlerSettingEnum.LOCK_TIME"
      :suffix="
        getLockTime === 0
          ? t('layout.setting.notAutoScreenLock')
          : t('layout.setting.minute')
      "
    />
    <InputNumberItem
      :title="t('layout.setting.expandedMenuWidth')"
      :min="100"
      :max="600"
      :step="10"
      :def="getMenuWidth"
      suffix="px"
      :event="HandlerSettingEnum.MENU_WIDTH"
      :disabled="!getShowMenuRef"
    />
  </VbenSpace>
</template>
