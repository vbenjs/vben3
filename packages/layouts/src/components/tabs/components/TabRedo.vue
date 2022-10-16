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
  <VbenIconify
    icon="ant-design:redo-outlined"
    :infinite="loading"
    @click="handleRedo"
  />
</template>

<style scoped lang="css"></style>
