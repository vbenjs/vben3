<script lang="ts" setup>
import { ThemeEnum } from '@vben/constants'
import { context } from '../../../../bridge'
import { computed } from "vue";

const { useAppStore } = context
const appStore = useAppStore()
const isDark = computed(() => appStore.getDarkMode == ThemeEnum.DARK)
const handlerDarkModeToggle = (v) => {
  appStore.setDarkMode(v ? ThemeEnum.DARK : ThemeEnum.LIGHT)
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
