<script lang="ts" setup>
import { ref } from 'vue'

import { context } from '../../../bridge'
const { useAppStore, useMultipleTabStore, useUserStore } = context
const settingDrawerShow = ref(false)
const appStore = useAppStore()
const tabStore = useMultipleTabStore()
const userStore = useUserStore()

const handleClearAndRedo = () => {
  localStorage.clear()
  appStore.resetAllState()
  // permissionStore.resetState()
  tabStore.resetState()
  userStore.resetState()
  location.reload()
}
</script>

<template>
  <div class="flex items-center">
    <VbenIconify
      icon="ion:settings-outline"
      hoverPointer
      @click="settingDrawerShow = true"
    />
    <VbenDrawer v-model:show="settingDrawerShow">
      <VbenDrawerContent>
        <template #header>setting</template>
        <VbenButton @click="handleClearAndRedo">重置</VbenButton>
      </VbenDrawerContent>
    </VbenDrawer>
  </div>
</template>
