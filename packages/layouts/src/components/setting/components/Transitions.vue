<script lang="ts" setup>
import SwitchItem from './SwitchItem.vue'
import SelectItem from './SelectItem.vue'
import {HandlerSettingEnum} from '@vben/constants'
import {context} from '../../../../bridge'
import {
  routerTransitionOptions
} from '../constant'
import {useI18n} from '@vben/locale'

const {t} = useI18n();

const {useTransitionSetting} = context


const {
  getOpenPageLoading,
  getBasicTransition,
  getEnableTransition,
  getOpenNProgress
} = useTransitionSetting();

</script>
<template>
  <VbenSpace vertical>
    <SwitchItem :title="t('layout.setting.progress')" :def="getOpenNProgress"
                :event="HandlerSettingEnum.OPEN_PROGRESS"/>
    <SwitchItem :title="t('layout.setting.switchLoading')" :def="getOpenPageLoading"
                :event="HandlerSettingEnum.OPEN_PAGE_LOADING"/>
    <SwitchItem :title="t('layout.setting.switchAnimation')" :def="getEnableTransition"
                :event="HandlerSettingEnum.OPEN_ROUTE_TRANSITION"/>
    <SelectItem :title="t('layout.setting.animationType')" :options="routerTransitionOptions"
                :def="getBasicTransition"
                :event="HandlerSettingEnum.ROUTER_TRANSITION" :disabled="getEnableTransition"/>
  </VbenSpace>
</template>
