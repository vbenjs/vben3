<script lang="ts" setup>
import {onMounted, ref, nextTick, computed, unref} from 'vue'
import {layoutHeader} from './data'

const header = ref<HTMLElement | null>(null)
import LayoutBreadcrumb from './components/breadcrumb/index.vue'
import LayoutTabs from './components/tabs/index.vue'
import LayoutMenu from './components/menu/index.vue'
import AppSearch from './components/search/AppSearch.vue'
import AppNotify from './components/notify/index.vue'
import AppFullScreen from './components/FullScreen.vue'
import AppSetting from './components/setting/index.vue'
import AppDarkMode from './components/darkMode/index.vue'
import userDropdown from './components/user-dropdown/index.vue'
import {context} from '../bridge'

const {useHeaderSetting, useRootSetting, useMenuSetting, useAppStore} = context
import {SettingButtonPositionEnum, ThemeEnum} from '@vben/constants'

const {
  getHeaderTheme,
  getShowContent,
  getShowBread,
  getShowFullScreen,
  getShowLocalePicker,
  getShowSearch,
  getShowHeader,
  getShowNotice,
} = useHeaderSetting()
const {getSettingButtonPosition, getShowSettingButton} = useRootSetting()
const {toggleCollapsed, getCollapsed} = useMenuSetting()

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

const appStore = useAppStore()
const isDark = computed(() => appStore.getDarkMode == ThemeEnum.DARK)
const changeTheme = (v) => {
  appStore.setDarkMode(v ? ThemeEnum.DARK : ThemeEnum.LIGHT)
}
const shadowColor = computed(() => (isDark.value ? 'rgb(255, 255, 255, 0.09)' : 'rgb(239, 239, 245)'))

const headerHeight = ref(0)

onMounted(() => {
  nextTick(() => {
    // 暴露header实例
    layoutHeader.value = header.value
    headerHeight.value = header.value?.$el?.clientHeight || 0;
  })
})
</script>
<template>
  <VbenLayout has-sider class="h-full">
    <VbenLayoutSider
      show-trigger
      bordered
      :collapsed-width="48"
      :width="160"
      collapse-mode="width"
      :collapsed="getCollapsed"
      @update:collapsed="toggleCollapsed"
    >
      <slot name="sider">
        <LayoutMenu/>
      </slot>
    </VbenLayoutSider>
    <VbenLayout class="relative">
      <VbenLayoutHeader ref="header" class="absolute z-99">
        <slot name="header">
            <VbenSpace vertical>
              <VbenSpace class="h-48px shadow" :style="{'--un-shadow-color': shadowColor}"
                         justify="space-between" align="center">
                <div class="pl-8px pr-8px">
                  <slot name="breadcrumb">
                    <LayoutBreadcrumb v-if="getShowContent && getShowBread"/>
                  </slot>
                </div>
                <div class="pl-8px pr-8px">
                  <slot name="buttons">
                    <VbenSpace class="p-1" align="center">
                      <AppSearch v-if="getShowSearch"/>
                      <AppNotify :is-dark="isDark" v-if="getShowNotice"/>
                      <AppFullScreen v-if="getShowFullScreen"/>
                      <VbenLocalePicker
                        v-if="getShowLocalePicker"
                        :reload="true"
                        :showText="false"
                      />
                      <userDropdown/>
                      <AppDarkMode :is-dark="isDark" @change="changeTheme"/>
                      <AppSetting v-if="getShowSetting"/>
                    </VbenSpace>
                  </slot>
                </div>
              </VbenSpace>
              <div>
                <slot name="tabs">
                  <LayoutTabs/>
                </slot>
              </div>
            </VbenSpace>
          </slot>
      </VbenLayoutHeader>
      <VbenLayoutContent :style="{marginTop: headerHeight + 'px'}" id="layout_main">
        <slot name="main"></slot>
      </VbenLayoutContent>
    </VbenLayout>
  </VbenLayout>
</template>

<style scoped>

</style>
