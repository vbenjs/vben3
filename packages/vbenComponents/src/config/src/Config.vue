<script lang="ts" setup name="VbenConfig">
import { maps } from '#/index'
import { computed } from 'vue'
import { ThemeEnum } from '@vben/constants'
const Config = maps.get('Config')
const darkTheme = maps.get('DarkTheme')
import { context } from '../../../bridge'
const { useConfigStore } = context
const configStore = useConfigStore()
const theme = computed(() =>
  configStore.getDarkMode == ThemeEnum.DARK ? darkTheme : null,
)
</script>
<template>
  <Config v-bind="$attrs" abstract :theme="theme"> <slot></slot></Config>
</template>

<style scoped></style>
