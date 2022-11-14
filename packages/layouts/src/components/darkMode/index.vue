<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ThemeEnum } from '@vben/constants'
import { context } from '../../../bridge'
const { useAppStore } = context
const appStore = useAppStore()
const isDark = computed(() => appStore.getDarkMode == ThemeEnum.DARK)
const changeTheme = (v) => {
  appStore.setDarkMode(v ? ThemeEnum.DARK : ThemeEnum.LIGHT)
}
</script>

<template>
  <VbenSwitch v-model:value="isDark" @update:value="changeTheme">
    <template #checked-icon>
      <VbenIconify icon="emojione:crescent-moon" />
    </template>
    <template #unchecked-icon>
      <VbenIconify icon="emojione:sun-with-face" />
    </template>
  </VbenSwitch>
</template>
