<script lang="ts" setup>
import { useI18n } from '@vben/locale'
import { navigationBarTypeList } from '../constant'
import {
  HandlerSettingEnum,
  APP_PRESET_COLOR_LIST,
  HEADER_PRESET_BG_COLOR_LIST,
  SIDE_BAR_BG_COLOR_LIST,
} from '@vben/constants'

import DarkModeToggle from './components/DarkModeToggle.vue'
import NavigationBarPicker from './components/NavigationBarPicker.vue'
import ThemeColorPicker from './components/ThemeColorPicker.vue'
import Transitions from './components/Transitions.vue'
import InterfaceFunction from './components/InterfaceFunction.vue'
import InterfaceDisplay from './components/InterfaceDisplay.vue'
import HandleButtons from './components/HandleButtons.vue'
import { useAppConfig } from '@vben/hooks'
const { baseHandler } = useAppConfig()

const { t } = useI18n()
const {
  openSettingDrawer,
  toggleOpenSettingDrawer,
  isHorizontal,
  navBarMode,
  themeColor,
  header,
  sidebar,
} = useAppConfig()
</script>

<template>
  <VbenDrawer
    :show="openSettingDrawer"
    @update:show="toggleOpenSettingDrawer"
    :width="330"
  >
    <VbenDrawerContent closable>
      <template #header>{{ t('layout.setting.drawerTitle') }}</template>

      <VbenDivider title-placement="left">
        {{ t('layout.setting.darkMode') }}
      </VbenDivider>
      <DarkModeToggle />
      <VbenDivider title-placement="left">
        {{ t('layout.setting.navMode') }}
      </VbenDivider>
      <NavigationBarPicker
        :def="navBarMode"
        :type-list="navigationBarTypeList"
        @handler="
          (item) => {
            baseHandler(HandlerSettingEnum.CHANGE_LAYOUT, {
              mode: item.mode,
              type: item.type,
              split: isHorizontal ? false : undefined,
            })
          }
        "
      />

      <template v-if="false">
        <VbenDivider title-placement="left">
          {{ t('layout.setting.sysTheme') }}
        </VbenDivider>
        <ThemeColorPicker
          :def="themeColor"
          :event="HandlerSettingEnum.CHANGE_THEME_COLOR"
          :color-list="APP_PRESET_COLOR_LIST"
        />
      </template>

      <VbenDivider title-placement="left">
        {{ t('layout.setting.headerTheme') }}
      </VbenDivider>
      <ThemeColorPicker
        :def="header.bgColor"
        :event="HandlerSettingEnum.HEADER_THEME"
        :color-list="HEADER_PRESET_BG_COLOR_LIST"
      />
      <VbenDivider title-placement="left">{{
        t('layout.setting.sidebarTheme')
      }}</VbenDivider>

      <ThemeColorPicker
        :def="sidebar.bgColor"
        :event="HandlerSettingEnum.MENU_THEME"
        :color-list="SIDE_BAR_BG_COLOR_LIST"
      />

      <VbenDivider title-placement="left">
        {{ t('layout.setting.interfaceFunction') }}
      </VbenDivider>
      <InterfaceFunction />

      <VbenDivider title-placement="left">
        {{ t('layout.setting.interfaceDisplay') }}
      </VbenDivider>
      <InterfaceDisplay />

      <VbenDivider title-placement="left">
        {{ t('layout.setting.animation') }}
      </VbenDivider>
      <Transitions />
      <VbenDivider />

      <HandleButtons />
    </VbenDrawerContent>
  </VbenDrawer>
</template>
<style lang="scss" scoped></style>
