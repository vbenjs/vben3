<script lang="ts" setup>
import { SettingButtonPosition } from '../setting'
import {context} from '../../../bridge'
import {computed, unref} from "vue";
import { SettingButtonPositionEnum } from '@vben/constants'


const { useRootSetting, useHeaderSetting } = context;
const { getShowSettingButton, getSettingButtonPosition, getFullContent } = useRootSetting();
const { getShowHeader } = useHeaderSetting();
const getIsFixedSettingDrawer = computed(() => {
  if (!unref(getShowSettingButton)) {
    return false;
  }
  const settingButtonPosition = unref(getSettingButtonPosition);

  if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
    return !unref(getShowHeader) || unref(getFullContent);
  }
  return settingButtonPosition === SettingButtonPositionEnum.FIXED;
});
</script>
<template>
  <SettingButtonPosition v-if="getIsFixedSettingDrawer" />
</template>
<style lang="scss" scoped></style>
