<script setup lang="ts">
import { usePromise } from '@vben/hooks'
import SuffixItemWrapper from './SuffixItemWrapper.vue'

function reload() {
  return new Promise(async (resolve) => {
    // await refreshPage()
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
  <SuffixItemWrapper @click="handleRedo">
    <VbenIconify icon="ep:refresh-right" size="18" :infinite="loading" />
  </SuffixItemWrapper>
</template>
