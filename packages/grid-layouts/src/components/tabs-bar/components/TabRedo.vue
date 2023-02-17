<script setup lang="ts">
import { useAppConfig, usePromise, useTabs } from '@vben/hooks'
import SuffixItemWrapper from '../../comm/SuffixItemWrapper.vue'

const { refreshPage } = useTabs()

const { tabTar } = useAppConfig()
function reload() {
  return new Promise(async (resolve) => {
    await refreshPage()
    setTimeout(() => {
      resolve({})
    }, 1000)
  })
}

const { loading, handleFn: handleRedo } = usePromise(reload, {
  immediate: false,
})
</script>

<template>
  <SuffixItemWrapper @click="handleRedo" v-if="tabTar.showRedo">
    <VbenIconify icon="ep:refresh-right" size="18" :infinite="loading" />
  </SuffixItemWrapper>
</template>
