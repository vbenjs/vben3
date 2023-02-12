<script lang="ts" setup>
import { useAppTheme } from '@vben/hooks'
const { isDark, toggleTheme } = useAppTheme()
</script>

<template>
  <VbenSpace justify="center">
    <VbenSwitch :value="isDark" @update:value="toggleTheme">
      <template #checked-icon>
        <VbenIconify icon="emojione:crescent-moon" hoverPointer />
      </template>
      <template #unchecked-icon>
        <VbenIconify icon="emojione:sun-with-face" hoverPointer />
      </template>
    </VbenSwitch>
  </VbenSpace>
</template>
