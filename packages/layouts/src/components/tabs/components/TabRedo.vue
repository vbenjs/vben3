<script setup lang="ts">
import { context } from '../../../../bridge'
const { usePromise, useTabs } = context
const { refreshPage } = useTabs()

function reload() {
  return new Promise(async (resolve) => {
    await refreshPage()
    setTimeout(() => {
      resolve({})
    }, 1200)
  })
}

const { loading, handleFn: handleRedo } = usePromise(reload, {
  immediate: false,
})
</script>

<template>
  <div @click="handleRedo"
    class="h-full w-32px border-l flex-center border-[var(--n-border-color)] cursor-pointer">
    <VbenIconify
      icon="ant-design:redo-outlined"
      :infinite="loading"
    />
  </div>
</template>

<style scoped lang="css"></style>
