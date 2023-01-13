<script lang="ts" setup>
import SwitchItem from './SwitchItem.vue'
import {HandlerSettingEnum} from '@vben/constants'
import {context} from '../../../../bridge'
import {useI18n} from '@vben/locale'

const {t} = useI18n();

const {
  useMultipleTabSetting,
  useMenuSetting,
  useHeaderSetting,
  useRootSetting,
} = context

const {
  getShowFooter,
  getShowBreadCrumb,
  getShowBreadCrumbIcon,
  getShowLogo,
  getFullContent,
  getColorWeak,
  getGrayMode,
} = useRootSetting();


const {
  getIsHorizontal,
  getShowMenu,
  getIsMixSidebar,
} = useMenuSetting();

const {getShowHeader} = useHeaderSetting();

const {getShowMultipleTab, getShowQuick, getShowRedo, getShowFold} = useMultipleTabSetting();

</script>
<template>
  <VbenSpace vertical>
    <SwitchItem :title="t('layout.setting.breadcrumb')" :def="getShowBreadCrumb"
                :event="HandlerSettingEnum.SHOW_BREADCRUMB"
                :disabled="!getShowHeader"/>
    <SwitchItem :title="t('layout.setting.breadcrumbIcon')" :def="getShowBreadCrumbIcon"
                :event="HandlerSettingEnum.SHOW_BREADCRUMB_ICON" :disabled="!getShowBreadCrumb"/>
    <SwitchItem :title="t('layout.setting.tabs')" :def="getShowMultipleTab"
                :event="HandlerSettingEnum.TABS_SHOW"/>
    <SwitchItem :title="t('layout.setting.tabsRedoBtn')" :def="getShowRedo"
                :event="HandlerSettingEnum.TABS_SHOW_REDO"
                :disabled="!getShowMultipleTab"/>
    <SwitchItem :title="t('layout.setting.tabsQuickBtn')" :def="getShowQuick"
                :event="HandlerSettingEnum.TABS_SHOW_QUICK"
                :disabled="!getShowMultipleTab"/>
    <SwitchItem :title="t('layout.setting.tabsFoldBtn')" :def="getShowFold"
                :event="HandlerSettingEnum.TABS_SHOW_FOLD"
                :disabled="!getShowMultipleTab"/>
    <SwitchItem :title="t('layout.setting.sidebar')" :def="getShowMenu"
                :event="HandlerSettingEnum.MENU_SHOW_SIDEBAR"
                :disabled="getIsHorizontal"/>
    <SwitchItem :title="t('layout.setting.header')" :def="getShowHeader"
                :event="HandlerSettingEnum.HEADER_SHOW"/>
    <SwitchItem title="Logo" :def="getShowLogo" :event="HandlerSettingEnum.SHOW_LOGO"
                :disabled="getIsMixSidebar"/>
    <SwitchItem :title="t('layout.setting.footer')" :def="getShowFooter"
                :event="HandlerSettingEnum.SHOW_FOOTER"/>
    <SwitchItem :title="t('layout.setting.fullContent')" :def="getFullContent"
                :event="HandlerSettingEnum.FULL_CONTENT"/>
    <SwitchItem :title="t('layout.setting.grayMode')" :def="getGrayMode"
                :event="HandlerSettingEnum.GRAY_MODE"/>
    <SwitchItem :title="t('layout.setting.colorWeak')" :def="getColorWeak"
                :event="HandlerSettingEnum.COLOR_WEAK"/>
  </VbenSpace>
</template>
