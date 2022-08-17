<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useI18n } from '@vben/locale'
const router = useRouter()
const { t } = useI18n()
const name = ref(1)
const panels = [1, 2, 3, 4]
const handleClose = (i) => {
  console.log(i)
}
const b = computed(() => {
  return router.currentRoute.value.matched
})
</script>

<template>
  <VbenTabs v-model:value="name" type="card" @close="handleClose">
    <VbenTabPane
      v-for="panel in panels"
      :key="panel"
      :tab="panel.toString()"
      :name="panel"
    />
    <template #suffix> Suffix </template>
  </VbenTabs>
</template>
