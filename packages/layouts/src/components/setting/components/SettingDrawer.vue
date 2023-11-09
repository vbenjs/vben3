<script lang="ts" setup>
import DarkModeToggle from './DarkModeToggle.vue'
import NavigationBarPicker from './NavigationBarPicker.vue'

import Features from './Features.vue'
import Content from './Content.vue'
import Transitions from './Transitions.vue'
import FooterButtons from './FooterButtons.vue'
import {
  APP_PRESET_COLOR_LIST,
  HEADER_PRESET_BG_COLOR_LIST,
  SIDE_BAR_BG_COLOR_LIST,
  HandlerSettingEnum,
  ThemeChangeEnum,
} from '@vben/constants'
import { context } from '../../../../bridge'
import { navigationBarTypeList } from '../constant'
import { useI18n } from '@vben/locale'
import { useAppTheme } from '@vben/hooks'
import ThemeEditor from '#/components/setting/components/ThemeEditor.vue'

const { useAppConfig } = context
const { baseHandler } = useAppConfig()

const { primaryColor, infoColor, successColor, warningColor, errorColor } =
  useAppTheme()

const { t } = useI18n()

const { useMenuSetting, useHeaderSetting, useRootSetting } = context

const { getShowDarkModeToggle } = useRootSetting()
const { getIsHorizontal, getMenuType, getMenuBgColor } = useMenuSetting()
const { getHeaderBgColor } = useHeaderSetting()

defineProps({
  visible: { type: Boolean, default: false },
})
const emit = defineEmits(['update:visible'])
const onVisible = (show: boolean) => {
  emit('update:visible', show)
}
</script>

<template>
  <VbenDrawer :show="visible" @update:show="onVisible" :width="330">
    <VbenDrawerContent closable>
      <template #header>{{ t('layout.setting.drawerTitle') }}</template>
      <template v-if="getShowDarkModeToggle">
        <VbenDivider title-placement="left">
          {{ t('layout.setting.darkMode') }}
        </VbenDivider>
        <DarkModeToggle />
      </template>
      <VbenDivider title-placement="left">
        {{ t('layout.setting.navMode') }}
      </VbenDivider>
      <NavigationBarPicker
        :def="getMenuType"
        :event="HandlerSettingEnum.CHANGE_LAYOUT"
        :type-list="navigationBarTypeList"
        @handler="
          (item) => {
            baseHandler(HandlerSettingEnum.CHANGE_LAYOUT, {
              mode: item.mode,
              type: item.type,
              split: getIsHorizontal ? false : undefined,
            })
          }
        "
      />
      <VbenDivider title-placement="left">
        {{ t('layout.setting.themeEditor') }}
      </VbenDivider>
      <ThemeEditor />
      <VbenDivider title-placement="left">
        {{ t('layout.setting.interfaceFunction') }}
      </VbenDivider>
      <Features />
      <VbenDivider title-placement="left">
        {{ t('layout.setting.interfaceDisplay') }}
      </VbenDivider>
      <Content />
      <VbenDivider title-placement="left">
        {{ t('layout.setting.animation') }}
      </VbenDivider>
      <Transitions />
      <VbenDivider />
      <FooterButtons />
    </VbenDrawerContent>
  </VbenDrawer>
</template>
