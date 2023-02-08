<script lang="ts" setup>
import {
  useHeaderSettingStore,
  useMenuSettingStore,
  useSporadicSettingStore,
} from '../../store'
import { storeToRefs } from 'pinia'
import { useI18n } from '@vben/locale'
import { navigationBarTypeList } from '../../logics/constant'
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
import { useHandler } from '../../hooks/useHandler'

const { t } = useI18n()
const sporadicSettingStore = useSporadicSettingStore()
const { showSettingDrawer, themeColor } = storeToRefs(sporadicSettingStore)
const menuSettingStore = useMenuSettingStore()
const {
  type: navBarType,
  isHorizontal,
  bgColor: menuBgColor,
} = storeToRefs(menuSettingStore)
const headerSettingStore = useHeaderSettingStore()
const { bgColor: headerBgColor } = storeToRefs(headerSettingStore)

const { baseHandler } = useHandler()
</script>

<template>
  <VbenDrawer
    :show="showSettingDrawer"
    @update:show="sporadicSettingStore.toggleSettingDrawerVisible()"
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
        :def="navBarType"
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

      <VbenDivider title-placement="left">
        {{ t('layout.setting.sysTheme') }}
      </VbenDivider>
      <ThemeColorPicker
        :def="themeColor"
        :event="HandlerSettingEnum.CHANGE_THEME_COLOR"
        :color-list="APP_PRESET_COLOR_LIST"
      />

      <VbenDivider title-placement="left">
        {{ t('layout.setting.headerTheme') }}
      </VbenDivider>
      <ThemeColorPicker
        :def="headerBgColor"
        :event="HandlerSettingEnum.HEADER_THEME"
        :color-list="HEADER_PRESET_BG_COLOR_LIST"
      />
      <VbenDivider title-placement="left">{{
        t('layout.setting.sidebarTheme')
      }}</VbenDivider>

      <ThemeColorPicker
        :def="menuBgColor"
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
