<script lang="ts" setup>
import SwitchItem from './SwitchItem.vue'
import SelectItem from './SelectItem.vue'
import { HandlerSettingEnum } from '@vben/constants'
import { routerTransitionOptions } from '../../../logics/constant'
import { useI18n } from '@vben/locale'
import { useTransitionSettingStore } from '../../../store'
import { storeToRefs } from '@vben/pinia'

const { t } = useI18n()

const { openPageLoading, openNProgress, enable, basicTransition } = storeToRefs(
  useTransitionSettingStore(),
)
</script>
<template>
  <VbenSpace vertical>
    <SwitchItem
      :title="t('layout.setting.progress')"
      :def="openNProgress"
      :event="HandlerSettingEnum.OPEN_PROGRESS"
    />
    <SwitchItem
      :title="t('layout.setting.switchLoading')"
      :def="openPageLoading"
      :event="HandlerSettingEnum.OPEN_PAGE_LOADING"
    />
    <SwitchItem
      :title="t('layout.setting.switchAnimation')"
      :def="enable"
      :event="HandlerSettingEnum.OPEN_ROUTE_TRANSITION"
    />
    <SelectItem
      :title="t('layout.setting.animationType')"
      :options="routerTransitionOptions"
      :def="basicTransition"
      :event="HandlerSettingEnum.ROUTER_TRANSITION"
      :disabled="!enable"
    />
  </VbenSpace>
</template>
