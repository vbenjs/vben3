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
    class="h-full w-36px border-l grid-center border-[var(--layout-border-color)] cursor-pointer"
  >
    <VbenIconify icon="ic:round-refresh" size="18" :infinite="loading" />
  </div>
</template>
