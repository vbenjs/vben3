<script lang="ts" setup name="VbenConfig">
import { maps } from '#/index'
import { computed } from 'vue'
import { ThemeEnum } from './data'
const Config = maps.get('Config')
const darkTheme = maps.get('DarkTheme')
import { context } from '../../../bridge'
const { useAppStore } = context
const appStore = useAppStore()
const theme = computed(() =>
  appStore.getDarkMode == ThemeEnum.Dark ? darkTheme : null,
)
// const themeValue = computed(() => {
//   return theme.value === ThemeEnum.Dark ? darkTheme : null;
// });
</script>
<template>
  <Config v-bind="$attrs" abstract :theme="theme"> <slot></slot></Config>
</template>

<style scoped></style>
