<script lang="ts" setup>
import SwitchItem from './SwitchItem.vue'
import { HandlerSettingEnum } from '@vben/constants'
import { useI18n } from '@vben/locale'
import {
  useRootSetting,
  useMenuSetting,
  useHeaderSetting,
  useMultipleTabSetting,
} from '@vben/hooks'

import { context } from '../../../../bridge'
const { useAppConfig } = context
const { baseHandler } = useAppConfig()

const { t } = useI18n()

const {
  getShowFooter,
  getShowBreadCrumb,
  getShowBreadCrumbIcon,
  getShowLogo,
  getFullContent,
  getColorWeak,
  getGrayMode,
} = useRootSetting()

const { getIsHorizontal, getShowMenu, getIsMixSidebar } = useMenuSetting()

const { getShowHeader } = useHeaderSetting()

const { getShowMultipleTab, getShowQuick, getShowRedo, getShowFold } =
  useMultipleTabSetting()

const eventHandler = (evt: HandlerSettingEnum, val: boolean) => {
  baseHandler(evt, val)
}
</script>
<template>
  <VbenSpace vertical>
    <SwitchItem
      :title="t('layout.setting.breadcrumb')"
      :value="getShowBreadCrumb"
      :callback="(v) => eventHandler(HandlerSettingEnum.SHOW_BREADCRUMB, v)"
      :disabled="!getShowHeader"
    />
    <SwitchItem
      :title="t('layout.setting.breadcrumbIcon')"
      :value="getShowBreadCrumbIcon"
      :callback="
        (v) => eventHandler(HandlerSettingEnum.SHOW_BREADCRUMB_ICON, v)
      "
      :disabled="!getShowBreadCrumb"
    />
    <SwitchItem
      :title="t('layout.setting.tabs')"
      :value="getShowMultipleTab"
      :callback="(v) => eventHandler(HandlerSettingEnum.TABS_SHOW, v)"
    />
    <SwitchItem
      :title="t('layout.setting.tabsRedoBtn')"
      :value="getShowRedo"
      :callback="(v) => eventHandler(HandlerSettingEnum.TABS_SHOW_REDO, v)"
      :disabled="!getShowMultipleTab"
    />
    <SwitchItem
      :title="t('layout.setting.tabsQuickBtn')"
      :value="getShowQuick"
      :callback="(v) => eventHandler(HandlerSettingEnum.TABS_SHOW_QUICK, v)"
      :disabled="!getShowMultipleTab"
    />
    <SwitchItem
      :title="t('layout.setting.tabsFoldBtn')"
      :value="getShowFold"
      :callback="(v) => eventHandler(HandlerSettingEnum.TABS_SHOW_FOLD, v)"
      :disabled="!getShowMultipleTab"
    />
    <SwitchItem
      :title="t('layout.setting.sidebar')"
      :def="getShowMenu"
      :callback="(v) => eventHandler(HandlerSettingEnum.MENU_SHOW_SIDEBAR, v)"
      :disabled="getIsHorizontal"
    />
    <SwitchItem
      :title="t('layout.setting.header')"
      :value="getShowHeader"
      :callback="(v) => eventHandler(HandlerSettingEnum.HEADER_SHOW, v)"
    />
    <SwitchItem
      title="Logo"
      :value="getShowLogo"
      :callback="(v) => eventHandler(HandlerSettingEnum.SHOW_LOGO, v)"
      :disabled="getIsMixSidebar"
    />
    <SwitchItem
      :title="t('layout.setting.footer')"
      :value="getShowFooter"
      :callback="(v) => eventHandler(HandlerSettingEnum.SHOW_FOOTER, v)"
    />
    <SwitchItem
      :title="t('layout.setting.fullContent')"
      :value="getFullContent"
      :callback="(v) => eventHandler(HandlerSettingEnum.FULL_CONTENT, v)"
    />
    <SwitchItem
      :title="t('layout.setting.grayMode')"
      :value="getGrayMode"
      :callback="(v) => eventHandler(HandlerSettingEnum.GRAY_MODE, v)"
    />
    <SwitchItem
      :title="t('layout.setting.colorWeak')"
      :value="getColorWeak"
      :callback="(v) => eventHandler(HandlerSettingEnum.COLOR_WEAK, v)"
    />
  </VbenSpace>
</template>
