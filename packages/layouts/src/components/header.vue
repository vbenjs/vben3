<script lang="ts" setup>
import LayoutBreadcrumb from '../components/breadcrumb/index.vue'
import LayoutTabs from '../components/tabs/index.vue'
import AppSearch from '../components/search/AppSearch.vue'
import AppNotify from '../components/notify/index.vue'
import AppFullScreen from '../components/FullScreen.vue'
import {SettingButton} from '../components/setting'
import UserDropdown from '../components/user-dropdown/index.vue'
import {context} from '../../bridge'
import {computed, unref} from 'vue'
import {
  SettingButtonPositionEnum,
  ThemeEnum,
  MenuTypeEnum,
} from '@vben/constants'

const {
  useHeaderSetting,
  useRootSetting,
  useMenuSetting,
  useConfigStore,
  Logo,
  useAppInject,
  useMultipleTabSetting
} = context
const {
  getShowContent,
  getShowBread,
  getShowFullScreen,
  getShowLocalePicker,
  getShowSearch,
  getShowHeader,
  getShowNotice,
  getShowFullHeaderRef,
  getShowHeaderLogo
} = useHeaderSetting()
const { getDarkMode } = useConfigStore()
const {getSettingButtonPosition, getShowSettingButton} = useRootSetting()
const {getMenuType, getMenuWidth} = useMenuSetting()
const {getIsMobile} = useAppInject()
const {getShowMultipleTab} = useMultipleTabSetting();
const isDark = computed(() => getDarkMode == ThemeEnum.DARK)
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

const getShowHeaderMultipleTab = computed(()=>{
  return unref(getShowMultipleTab) && (unref(getMenuType) !== MenuTypeEnum.MIX || unref(getIsMobile))
})
</script>
<template>
  <VbenSpace vertical>
    <VbenSpace
      v-if="getShowFullHeaderRef"
      :class="['h-48px', 'shadow', {'mb-8px': !getShowHeaderMultipleTab}]"
      :style="{ '--un-shadow-color': 'var(--n-border-color)' }"
      justify="space-between"
      align="center"
    >
      <slot name="logo">
        <VbenSpace align="center">
          <Logo
            v-if="getShowHeaderLogo"
            :style="{width: getMenuWidth + 'px', maxWidth: getMenuWidth + 'px'}"
          />
          <slot name="breadcrumb">
            <LayoutBreadcrumb
              v-if="
              getShowContent &&
              getShowBread &&
              getMenuType !== MenuTypeEnum.TOP_MENU
            "
            />
          </slot>
        </VbenSpace>
      </slot>
      <slot name="menu"></slot>
      <div class="pl-8px pr-8px">
        <slot name="buttons">
          <VbenSpace class="p-1" :size="16" align="center">
            <AppSearch v-if="getShowSearch"/>
            <AppNotify :is-dark="isDark" v-if="getShowNotice"/>
            <AppFullScreen v-if="getShowFullScreen"/>
            <VbenLocalePicker
              v-if="getShowLocalePicker"
              :reload="true"
              :showText="false"
            />
            <UserDropdown/>
            <SettingButton v-if="getShowSetting"/>
          </VbenSpace>
        </slot>
      </div>
    </VbenSpace>
    <template v-if="getShowHeaderMultipleTab">
      <slot name="tabs">
        <LayoutTabs/>
      </slot>
    </template>
  </VbenSpace>
</template>

<style></style>
