<script lang="ts" setup>
import LayoutBreadcrumb from '../components/breadcrumb/index.vue'
import LayoutTabs from '../components/tabs/index.vue'
import AppSearch from '../components/search/AppSearch.vue'
import AppNotify from '../components/notify/index.vue'
import AppFullScreen from '../components/FullScreen.vue'
import AppSetting from '../components/setting/index.vue'
import UserDropdown from '../components/user-dropdown/index.vue'
import { context } from '../../bridge'
import { computed, unref } from 'vue'
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
} = context
const {
  getShowContent,
  getShowBread,
  getShowFullScreen,
  getShowLocalePicker,
  getShowSearch,
  getShowHeader,
  getShowNotice,
} = useHeaderSetting()
const { getSettingButtonPosition, getShowSettingButton } = useRootSetting()
const { getMenuType, getMenuWidth } = useMenuSetting()
const shadowColor = computed(() =>
  isDark.value ? 'rgb(255, 255, 255, 0.09)' : 'rgb(239, 239, 245)',
)

const configStore = useConfigStore()
const isDark = computed(() => configStore.getDarkMode == ThemeEnum.DARK)

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
</script>
<template>
  <VbenSpace vertical>
    <VbenSpace
      class="h-48px shadow"
      :style="{ '--un-shadow-color': shadowColor }"
      justify="space-between"
      align="center"
    >
      <VbenSpace align="center">
        <Logo
          v-if="
            getMenuType === MenuTypeEnum.TOP_MENU ||
            getMenuType === MenuTypeEnum.MIX
          "
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
      <div><slot name="menu"></slot></div>
      <div class="pl-8px pr-8px">
        <slot name="buttons">
          <VbenSpace class="p-1" :size="12" align="center">
            <AppSearch v-if="getShowSearch" />
            <AppNotify :is-dark="isDark" v-if="getShowNotice" />
            <AppFullScreen v-if="getShowFullScreen" />
            <VbenLocalePicker
              v-if="getShowLocalePicker"
              :reload="true"
              :showText="false"
            />
            <UserDropdown />
            <AppSetting v-if="getShowSetting" />
          </VbenSpace>
        </slot>
      </div>
    </VbenSpace>
    <div v-if="getMenuType !== MenuTypeEnum.MIX">
      <slot name="tabs">
        <LayoutTabs />
      </slot>
    </div>
  </VbenSpace>
</template>

<style></style>
