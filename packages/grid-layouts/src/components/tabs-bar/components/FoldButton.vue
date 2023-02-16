<script setup lang="ts">
import { computed, unref } from 'vue'
import SuffixItemWrapper from '../../comm/SuffixItemWrapper.vue'
import { useAppConfig } from '@vben/hooks'
import { triggerWindowResize } from '@vben/utils'

const { sidebar, header, setAppConfig, tabTar } = useAppConfig()
const getIsUnFold = computed(
  () => !unref(sidebar).visible && !unref(header).visible,
)

function handleFold() {
  const isUnFold = unref(getIsUnFold)
  setAppConfig({
    sidebar: { visible: isUnFold, show: isUnFold },
    header: { visible: isUnFold, show: isUnFold },
  })
  triggerWindowResize()
}
</script>

<template>
  <SuffixItemWrapper v-if="tabTar.showFold" @click.stop="handleFold">
    <VbenIconify
      :icon="getIsUnFold ? 'codicon:screen-normal' : 'codicon:screen-full'"
    />
  </SuffixItemWrapper>
</template>
