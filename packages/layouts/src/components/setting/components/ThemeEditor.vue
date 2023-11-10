<script lang="ts" setup>
import {
  APP_PRESET_COLOR_LIST,
  HEADER_PRESET_BG_COLOR_LIST,
  SIDE_BAR_BG_COLOR_LIST,
  ThemeChangeEnum,
} from '@vben/constants'
import { useI18n } from '@vben/locale'
import { useAppTheme } from '@vben/hooks'
import { context } from '../../../../bridge'
import ThemeColorPicker from './ThemeColorPicker.vue'

const { t } = useI18n()

const { useMenuSetting, useHeaderSetting } = context

const { getMenuBgColor } = useMenuSetting()
const { getHeaderBgColor } = useHeaderSetting()

const { primaryColor, infoColor, successColor, warningColor, errorColor } =
  useAppTheme()
</script>
<template>
  <VbenSpace justify="space-between" align="center">
    <ThemeColorPicker
      :title="t('layout.setting.primaryColor')"
      :def="primaryColor"
      :event="ThemeChangeEnum.THEME_PRIMARY_COLOR_CHANGE"
      :colorList="APP_PRESET_COLOR_LIST"
    />
    <ThemeColorPicker
      :title="t('layout.setting.infoColor')"
      :def="infoColor"
      :event="ThemeChangeEnum.THEME_INFO_COLOR_CHANGE"
    />
    <ThemeColorPicker
      :title="t('layout.setting.successColor')"
      :def="successColor"
      :event="ThemeChangeEnum.THEME_SUCCESS_COLOR_CHANGE"
    />
    <ThemeColorPicker
      :title="t('layout.setting.warningColor')"
      :def="warningColor"
      :event="ThemeChangeEnum.THEME_WARNING_COLOR_CHANGE"
    />
    <ThemeColorPicker
      :title="t('layout.setting.errorColor')"
      :def="errorColor"
      :event="ThemeChangeEnum.THEME_ERROR_COLOR_CHANGE"
    />
    <ThemeColorPicker
      :title="t('layout.setting.headerTheme')"
      :def="getHeaderBgColor"
      :event="ThemeChangeEnum.THEME_HEADER_BG_COLOR_CHANGE"
      :colorList="HEADER_PRESET_BG_COLOR_LIST"
    />
    <ThemeColorPicker
      :title="t('layout.setting.sidebarTheme')"
      :def="getMenuBgColor"
      :event="ThemeChangeEnum.THEME_SIDEBAR_BG_COLOR_CHANGE"
      :colorList="SIDE_BAR_BG_COLOR_LIST"
    />
  </VbenSpace>
</template>
