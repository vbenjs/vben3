<script lang="ts" setup name="VbenConfig">
import { maps } from '#/index'
import { computed, unref } from 'vue'
import { useAppTheme } from '@vben/hooks'
const Config = maps.get('Config')
const darkTheme = maps.get('DarkTheme')

const { isDark } = useAppTheme()
const appTheme = computed(() => (unref(isDark) ? darkTheme : null))
</script>
<template>
  <Config v-bind="$attrs" abstract :theme="appTheme"> <slot></slot></Config>
</template>

<style scoped></style>
