<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { computed, watch } from 'vue'
import { useI18n } from '@vben/locale'
const router = useRouter()
const { t } = useI18n()
// watch(
//   () => router.currentRoute.value,
//   () => {
//     console.log(router.currentRoute.value)
//   },
// )
const b = computed(() => {
  return router.currentRoute.value.matched
})
</script>

<template>
  <VbenSpace class="h-10 items-center" justify="space-between">
    <VbenBreadcrumb>
      <VbenBreadcrumbItem v-for="(i, k) in b" :key="k"
        >{{ t(i.meta.title) }}
        {{ i.children.length }}
      </VbenBreadcrumbItem>
    </VbenBreadcrumb>
    <div>123</div>
  </VbenSpace>
</template>
