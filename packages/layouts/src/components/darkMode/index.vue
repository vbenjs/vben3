<script lang="ts" setup>
import { computed, ref } from 'vue'
import { context } from '../../../bridge'
import { ThemeEnum } from '@vben/constants'
const { useAppStore } = context
const appStore = useAppStore()
const isDark = computed(() => appStore.getDarkMode == 'dark')
const changeTheme = (v) => {
  appStore.setDarkMode(v ? ThemeEnum.DARK : ThemeEnum.LIGHT)
}
</script>

<template>
  <VbenSwitch v-model:valut="isDark" @update:value="changeTheme">
    <template #checked-icon>
      <VbenIconify icon="emojione:sun-with-face" />
    </template>
    <template #unchecked-icon>
      <VbenIconify icon="emojione:crescent-moon" />
    </template>
  </VbenSwitch>
</template>
