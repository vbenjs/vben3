<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useI18n } from '@vben/locale'
import { useMultipleTabStore } from '@/store/multipleTab'
const { currentRoute, getRoutes } = useRouter()
const { t } = useI18n()
const name = ref(1)
const store = useMultipleTabStore()

const handleClose = (i) => {
  console.log(i)
}
// console.log(getRoutes())

const currentRouter = computed(() => {
  return getRoutes()
})
</script>

<template>
  <VbenTabs
    v-model:value="currentRoute.fullPath"
    type="card"
    @close="handleClose"
  >
    <VbenTabPane
      v-for="tab in store.getTabList"
      :key="tab"
      :tab="tab.meta.title"
      :name="tab.fullPath"
    ></VbenTabPane>
    <template #suffix> Suffix </template>
  </VbenTabs>
</template>
