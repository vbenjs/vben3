<script lang="ts" setup name="VbenConfig">
import { locale, maps } from '../../index'
// import { darkTheme, dateZhCN, zhCN } from 'naive-ui';
import { computed } from 'vue'
import { theme, ThemeEnum } from './data'
const Config = maps.get('Config')

// const themeValue = computed(() => {
//   return theme.value === ThemeEnum.Dark ? darkTheme : null;
// });
</script>
<template>
  <Config v-bind="$attrs" abstract> <slot></slot></Config>
</template>

<style scoped></style>
