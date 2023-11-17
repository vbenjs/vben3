<script lang="ts" setup>
import SwitchItem from './SwitchItem.vue'
import SelectItem from './SelectItem.vue'
import { HandlerSettingEnum } from '@vben/constants'
import { context } from '../../../../bridge'
import { routerTransitionOptions } from '../constant'
import { useI18n } from '@vben/locale'

const { t } = useI18n()

const { useTransitionSetting, useAppConfig } = context

const {
  getOpenPageLoading,
  getBasicTransition,
  getEnableTransition,
  getOpenNProgress,
} = useTransitionSetting()

const { baseHandler } = useAppConfig()
const eventHandler = (evt: HandlerSettingEnum, val: boolean) => {
  baseHandler(evt, val)
}
</script>
<template>
  <VbenSpace vertical>
    <SwitchItem
      :title="t('layout.setting.progress')"
      :value="getOpenNProgress"
      :callback="(v) => eventHandler(HandlerSettingEnum.OPEN_PROGRESS, v)"
    />
    <SwitchItem
      :title="t('layout.setting.switchLoading')"
      :value="getOpenPageLoading"
      :callback="(v) => eventHandler(HandlerSettingEnum.OPEN_PAGE_LOADING, v)"
    />
    <SwitchItem
      :title="t('layout.setting.switchAnimation')"
      :value="getEnableTransition"
      :callback="
        (v) => eventHandler(HandlerSettingEnum.OPEN_ROUTE_TRANSITION, v)
      "
    />
    <SelectItem
      :title="t('layout.setting.animationType')"
      :options="routerTransitionOptions"
      :def="getBasicTransition"
      :event="HandlerSettingEnum.ROUTER_TRANSITION"
      :disabled="getEnableTransition"
    />
  </VbenSpace>
</template>
