<script lang="ts" setup>
import SwitchItem from './SwitchItem.vue'
import SelectItem from './SelectItem.vue'
import { HandlerSettingEnum } from '@vben/constants'
import { routerTransitionOptions } from '../../constant'
import { useI18n } from '@vben/locale'
import { useAppConfig } from '@vben/hooks'

const { t } = useI18n()

const { transition } = useAppConfig()
</script>
<template>
  <VbenSpace vertical>
    <SwitchItem
      :title="t('layout.setting.progress')"
      :def="transition.openNProgress"
      :event="HandlerSettingEnum.OPEN_PROGRESS"
    />
    <SwitchItem
      :title="t('layout.setting.switchLoading')"
      :def="transition.openPageLoading"
      :event="HandlerSettingEnum.OPEN_PAGE_LOADING"
    />
    <SwitchItem
      :title="t('layout.setting.switchAnimation')"
      :def="transition.enable"
      :event="HandlerSettingEnum.OPEN_ROUTE_TRANSITION"
    />
    <SelectItem
      :title="t('layout.setting.animationType')"
      :options="routerTransitionOptions"
      :def="transition.basicTransition"
      :event="HandlerSettingEnum.ROUTER_TRANSITION"
      :disabled="!transition.enable"
    />
  </VbenSpace>
</template>
