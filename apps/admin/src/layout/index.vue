<script lang="ts" setup>
import { Layout } from '@vben/layouts'
import LayoutMenu from './components/menu/index.vue'
import LayoutTabs from './components/tabs/index.vue'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { computed, unref } from 'vue'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { SettingButtonPositionEnum } from '@/constants'

const { getShowHeader } = useHeaderSetting()

const { getSettingButtonPosition, getShowSettingButton } = useRootSetting()

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
  <layout>
    <template #sider>
      <div class="h-full">
        <LayoutMenu />
      </div>
    </template>
    <template #tabs>
      <LayoutTabs />
    </template>
    <template #main>
      <RouterView />
    </template>
  </layout>
</template>
