<script lang="ts" setup>
import { useMenuSettingStore } from '../../store'
import { storeToRefs } from '@vben/pinia'
import { TriggerEnum } from '@vben/constants'
import CenterTrigger from './SiderCenterTrigger.vue'
import FooterTrigger from './SiderFooterTrigger.vue'
import HeaderTrigger from './HeaderTrigger.vue'
const { trigger } = storeToRefs(useMenuSettingStore())
const triggers = {
  [TriggerEnum.HEADER]: HeaderTrigger,
  [TriggerEnum.CENTER]: CenterTrigger,
  [TriggerEnum.FOOTER]: FooterTrigger,
}
</script>
<template>
  <Transition name="trigger" mode="out-in">
    <component :is="triggers[trigger]" />
  </Transition>
</template>
