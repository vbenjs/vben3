<script lang="ts" setup>
import { ThemeEnum } from '@vben/constants'
import { storeToRefs } from 'pinia'
import { useHeaderSettingStore } from '../../../store'

const headerSettingStore = useHeaderSettingStore()

const { isDark } = storeToRefs(headerSettingStore)

const handlerDarkModeToggle = (v) => {
  headerSettingStore.setTheme(v ? ThemeEnum.DARK : ThemeEnum.LIGHT)
}
</script>

<template>
  <VbenSpace justify="center">
    <VbenSwitch :value="isDark" @update:value="handlerDarkModeToggle">
      <template #checked-icon>
        <VbenIconify icon="emojione:crescent-moon" hoverPointer />
      </template>
      <template #unchecked-icon>
        <VbenIconify icon="emojione:sun-with-face" hoverPointer />
      </template>
    </VbenSwitch>
  </VbenSpace>
</template>
