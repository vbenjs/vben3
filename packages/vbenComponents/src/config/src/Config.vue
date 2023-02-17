<script lang="ts" setup name="VbenConfig">
import { maps } from '#/index'
import { computed, unref } from 'vue'
import { useAppTheme } from '@vben/hooks'
import { ThemeEnum } from '@vben/constants'
const Config = maps.get('Config')
const darkTheme = maps.get('DarkTheme')

const props = defineProps({
  // Customize the configuration theme mode
  themeMode: {
    type: String,
    default: 'dark'
  },
  // Whether to inherit the theme
  inherit: {
    type: Boolean,
    default: true
  }
})
const { isDark } = useAppTheme()
const appTheme = computed(() => {
  if (!props.inherit){
    return props.themeMode === ThemeEnum.DARK ? darkTheme : null
  }
  return unref(isDark) ? darkTheme : null
})
</script>
<template>
  <Config v-bind="$attrs" abstract :theme="appTheme"> <slot></slot></Config>
</template>

<style scoped></style>
