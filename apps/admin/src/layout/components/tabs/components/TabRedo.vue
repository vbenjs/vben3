<script setup lang="ts">
import { useTabs } from '@/hooks/useTabs'
import Icon from '@components/common/icon/index.vue'
import { usePromise } from '@vben/hooks'

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
  <Icon
    icon="ant-design:redo-outlined"
    :infinite="loading"
    @click="handleRedo"
  />
</template>

<style scoped lang="css"></style>
