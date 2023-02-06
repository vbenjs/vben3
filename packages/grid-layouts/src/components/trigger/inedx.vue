<script lang="ts" setup>
import { useMenuSettingStore } from '../../store'
import { storeToRefs } from '@vben/pinia'
import { TriggerEnum } from '@vben/constants'
import CenterTrigger from './SiderCenterTrigger.vue'
import FooterTrigger from './SiderFooterTrigger.vue'
import HeaderTrigger from './HeaderTrigger.vue'
import { computed, defineComponent, unref } from 'vue'
const { trigger, showHeaderTrigger } = storeToRefs(useMenuSettingStore())
const component = computed<ReturnType<typeof defineComponent>>(() => {
  if (unref(showHeaderTrigger)) return HeaderTrigger
  if (unref(trigger) === TriggerEnum.CENTER) return CenterTrigger
  if (unref(trigger) === TriggerEnum.FOOTER) return FooterTrigger
  return undefined
})
</script>
<template>
  <component :is="component" />
</template>
