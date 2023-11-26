<script lang="ts" setup>
import HeaderTrigger from './trigger/HeaderTrigger.vue'
import LayoutBreadcrumb from '../components/breadcrumb/index.vue'
import LayoutTabs from '../components/tabs/index.vue'
import AppSearch from '../components/search/AppSearch.vue'
import AppNotify from '../components/notify/index.vue'
import AppFullScreen from '../components/FullScreen.vue'
import { SettingButton } from '../components/setting'
import UserDropdown from '../components/user-dropdown/index.vue'
import { context } from '../../bridge'
import { computed, unref } from 'vue'
import { SettingButtonPositionEnum, NavBarModeEnum } from '@vben/constants'
import { useAppTheme } from '@vben/hooks'

const { useAppConfig, useMenuSetting, useHeaderSetting, useRootSetting } =
  context

const { isTopMenu, isMix, menu } = useAppConfig()

const { Logo, useMultipleTabSetting } = context
const {
  getShowFullScreen,
  getShowLocalePicker,
  getShowSearch,
  getShowHeader,
  getShowNotice,
  getShowFullHeaderRef,
} = useHeaderSetting()
const { isHeaderDark } = useAppTheme()
const { getSettingButtonPosition, getShowSettingButton } = useRootSetting()
const { getMenuType, getMenuWidth, getShowHeaderTrigger } = useMenuSetting()
const { getShowMultipleTab } = useMultipleTabSetting()
const getShowSetting = computed(() => {
  if (!unref(getShowSettingButton)) {
    return false
  }
  const settingButtonPosition = unref(getSettingButtonPosition)

  if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
    return unref(getShowHeader)
  }
  return settingButtonPosition === SettingButtonPositionEnum.HEADER
})

const getShowHeaderMultipleTab = computed(() => {
  return unref(getShowMultipleTab) && unref(getMenuType) !== NavBarModeEnum.MIX
})
// 是否显示header中的logo
const showHeaderLogo = computed(() => {
  return unref(isTopMenu) || unref(isMix)
})
//是否显示header中的面包屑
const showHeaderBreadcrumb = computed(() => {
  return !(unref(isTopMenu) || (unref(isMix) && unref(menu).split))
})

//根据布局模式设置logo宽度
const logoWidth = computed(() => (unref(isTopMenu) ? 150 : getMenuWidth.value))
</script>
<template>
  <VbenSpace vertical>
    <VbenLayoutHeader :inverted="isHeaderDark">
      <VbenSpace
        v-if="getShowFullHeaderRef"
        :class="['h-48px', 'shadow']"
        :style="{ '--un-shadow-color': 'var(--n-border-color)' }"
        justify="space-between"
        align="center"
      >
        <slot name="logo">
          <VbenSpace align="center" class="items-center" :size="0">
            <Logo
              v-if="showHeaderLogo"
              :style="{
                width: logoWidth + 'px',
                maxWidth: logoWidth + 'px',
              }"
            />
            <HeaderTrigger v-if="getShowHeaderTrigger" />
            <slot name="breadcrumb" v-if="showHeaderBreadcrumb">
              <LayoutBreadcrumb />
            </slot>
          </VbenSpace>
        </slot>
        <slot name="menu" v-if="!showHeaderBreadcrumb"></slot>
        <div class="pl-8px pr-8px" id="userActionElement">
          <slot name="buttons">
            <VbenSpace class="p-1" :size="16" align="center">
              <AppSearch v-if="getShowSearch" />
              <AppNotify :is-dark="isHeaderDark" v-if="getShowNotice" />
              <AppFullScreen v-if="getShowFullScreen" />
              <VbenLocalePicker
                v-if="getShowLocalePicker"
                :reload="true"
                :showText="false"
              />
              <UserDropdown />
              <SettingButton v-if="getShowSetting" />
            </VbenSpace>
          </slot>
        </div>
      </VbenSpace>
    </VbenLayoutHeader>

    <template v-if="getShowHeaderMultipleTab">
      <slot name="tabs"> <LayoutTabs /></slot>
    </template>
  </VbenSpace>
</template>

<style></style>
