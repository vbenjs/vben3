<script lang="ts" setup>
import { HandlerSettingEnum, ThemeEnum } from '@vben/constants'
import { useAppConfig } from '@vben/hooks'

const { baseHandler, theme } = useAppConfig()
const handlerThemeModeToggle = (v) => {
  baseHandler(HandlerSettingEnum.CHANGE_THEME, v)
}
</script>

<template>
  <VbenSpace justify="center">
    <VbenSwitch
      :value="theme === ThemeEnum.DARK"
      @update:value="handlerThemeModeToggle"
    >
      <template #checked-icon>
        <VbenIconify icon="emojione:crescent-moon" hoverPointer />
      </template>
      <template #unchecked-icon>
        <VbenIconify icon="emojione:sun-with-face" hoverPointer />
      </template>
    </VbenSwitch>
  </VbenSpace>
</template>
