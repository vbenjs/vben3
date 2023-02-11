<script lang="ts" setup>
import TopButtonWrapper from '../comm/TopButtonWrapper.vue'
import { ref, watchEffect, unref, computed } from 'vue'
import {useLocale, localeList } from '@vben/locale'

const props = defineProps({
  /**
   * Whether to display text
   */
  showText: { type: Boolean, default: true },
  /**
   * Whether to refresh the interface when changing
   */
  reload: { type: Boolean },
})

const selectedKeys = ref<string[]>([])

const { changeLocale, getLocale } = useLocale()

const getLocaleText = computed(() => {
  const key = selectedKeys.value[0]
  if (!key) {
    return ''
  }
  return localeList.find((item) => item.event === key)?.text
})

const getLocaleList = computed(() => {
  return localeList.map((item) => ({
    label: item.text,
    key: item.event,
  }))
})

watchEffect(() => {
  selectedKeys.value = [unref(getLocale)]
})

async function toggleLocale(lang: string) {
  await changeLocale(lang)
  selectedKeys.value = [lang as string]
  props.reload && location.reload()
}

function handleMenuEvent(menu) {
  if (unref(getLocale) === menu) {
    return
  }
  toggleLocale(menu as string)
}
</script>
<template>
  <VbenDropdown
    trigger="click"
    :options="getLocaleList"
    @select="handleMenuEvent"
  >
    <TopButtonWrapper>
      <VbenIconify icon="carbon:ibm-watson-language-translator" />
<!--      <span v-if="showText" class="ml-1">{{ getLocaleText }}</span>-->
    </TopButtonWrapper>
  </VbenDropdown>
</template>
