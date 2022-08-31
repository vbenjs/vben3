<script lang="ts" setup>
import { ref, watchEffect, unref, computed } from 'vue'
import { context } from '../../bridge'
import { VbenIconify } from '../../iconify'

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

const { locale, localeList } = context

const { changeLocale, getLocale } = locale

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
    <span class="flex items-center cursor-pointer mx-2">
      <VbenIconify icon="ion:language" />
      <span v-if="showText" class="ml-1">{{ getLocaleText }}</span>
    </span>
  </VbenDropdown>
</template>

<style lang="less"></style>
