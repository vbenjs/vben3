<script setup lang="ts">
import { usePromise } from '@vben/hooks'

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
  <div
    @click="handleRedo"
    class="h-full w-36px grid-center border-l border-l-solid border-[var(--layout-border-color)] cursor-pointer"
  >
    <VbenIconify icon="ic:round-refresh" size="18" :infinite="loading" />
  </div>
</template>
