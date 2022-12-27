<script lang="ts" setup>
import {computed, unref} from 'vue'
import SwitchItem from './SwitchItem.vue'
import SelectItem from './SelectItem.vue'
import InputNumberItem from './InputNumberItem.vue'
import {
  MenuTypeEnum,
  TriggerEnum,
  HandlerSettingEnum
} from '@vben/constants'
import {context} from '../../../../bridge'
import {
  mixSidebarTriggerOptions,
  topMenuAlignOptions,
  getMenuTriggerOptions,
  contentModeOptions
} from '../constant'
import {useI18n} from '@vben/locale'

const {t} = useI18n();

const {
  useMenuSetting,
  useHeaderSetting,
  useRootSetting,
} = context


const {
  getContentMode,
  getLockTime,
} = useRootSetting();


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
  getMixSideFixed
} = useMenuSetting();

const {
  getShowHeader,
  getFixed: getHeaderFixed,
  getShowSearch,
} = useHeaderSetting();

const getShowMenuRef = computed(() => {
  return unref(getShowMenu) && !unref(getIsHorizontal);
});

let triggerDef = getTrigger;
const triggerOptions = getMenuTriggerOptions(unref(getSplit));
const some = triggerOptions.some((item) => item.value === unref(triggerDef));
if (!some) {
  triggerDef.value = TriggerEnum.FOOTER;
}

</script>
<template>
  <VbenSpace vertical>
    <SwitchItem :title="t('layout.setting.splitMenu')" :def="getSplit"
                :event="HandlerSettingEnum.MENU_SPLIT"
                :disabled="(!getShowMenuRef) || (getMenuType !== MenuTypeEnum.MIX)"/>
    <SwitchItem :title="t('layout.setting.mixSidebarFixed')" :def="getMixSideFixed"
                :event="HandlerSettingEnum.MENU_FIXED_MIX_SIDEBAR" :disabled="getIsMixSidebar"/>
    <SwitchItem :title="t('layout.setting.closeMixSidebarOnChange')"
                :def="getCloseMixSidebarOnChange"
                :event="HandlerSettingEnum.MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE"
                :disabled="!getIsMixSidebar"/>
    <SwitchItem :title="t('layout.setting.menuCollapse')" :def="getCollapsed"
                :event="HandlerSettingEnum.MENU_COLLAPSED"
                :disabled="!getShowMenuRef"/>
    <SwitchItem :title="t('layout.setting.menuDrag')" :def="getCanDrag"
                :event="HandlerSettingEnum.MENU_HAS_DRAG"
                :disabled="!getShowMenuRef"/>
    <SwitchItem :title="t('layout.setting.menuSearch')" :def="getShowSearch"
                :event="HandlerSettingEnum.HEADER_SEARCH"
                :disabled="!getShowHeader"/>
    <SwitchItem :title="t('layout.setting.menuAccordion')" :def="getAccordion"
                :event="HandlerSettingEnum.MENU_ACCORDION" :disabled="!getShowMenuRef"/>
    <SwitchItem :title="t('layout.setting.collapseMenuDisplayName')" :def="getCollapsedShowTitle"
                :event="HandlerSettingEnum.MENU_COLLAPSED_SHOW_TITLE"
                :disabled="!getShowMenuRef || !getCollapsed || getIsMixSidebar"/>
    <SwitchItem :title="t('layout.setting.fixedHeader')" :def="getHeaderFixed"
                :event="HandlerSettingEnum.HEADER_FIXED"
                :disabled="getShowHeader"/>
    <SwitchItem :title="t('layout.setting.fixedSideBar')" :def="getMenuFixed"
                :event="HandlerSettingEnum.MENU_FIXED"
                :disabled="!getShowMenuRef || getIsMixSidebar"/>
    <SelectItem :title="t('layout.setting.mixSidebarTrigger')" :options="mixSidebarTriggerOptions"
                :def="getMixSideTrigger" :event="HandlerSettingEnum.MENU_TRIGGER_MIX_SIDEBAR"
                :disabled="!getIsMixSidebar"/>
    <SelectItem :title="t('layout.setting.topMenuLayout')" :options="topMenuAlignOptions"
                :def="getTopMenuAlign"
                :event="HandlerSettingEnum.MENU_TOP_ALIGN"
                :disabled="!getShowHeader || getSplit || (!getIsTopMenu && !getSplit) ||getIsMixSidebar"/>
    <SelectItem :title="t('layout.setting.menuCollapseButton')" :options="triggerOptions"
                :def="triggerDef"
                :event="HandlerSettingEnum.MENU_TRIGGER"
                :disabled="!getShowMenuRef || getIsMixSidebar"/>
    <SelectItem :title="t('layout.setting.contentMode')" :options="contentModeOptions"
                :def="getContentMode"
                :event="HandlerSettingEnum.CONTENT_MODE"/>
    <InputNumberItem :title="t('layout.setting.autoScreenLock')" :min="0" :def="getLockTime"
                     :event="HandlerSettingEnum.LOCK_TIME"
                     :suffix=" getLockTime === 0 ? t('layout.setting.notAutoScreenLock') : t('layout.setting.minute')"/>
    <InputNumberItem :title="t('layout.setting.expandedMenuWidth')" :min="100" :max="600" :step="10"
                     :def="getMenuWidth" suffix="px" :event="HandlerSettingEnum.MENU_WIDTH"
                     :disabled="getShowMenuRef"/>
  </VbenSpace>
</template>
