<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useI18n } from '@vben/locale'
const router = useRouter()
const { t } = useI18n()
// watch(
//   () => router.currentRoute.value,
//   () => {
//     console.log(router.currentRoute.value)
//   },
// )
const breadcrumbList = computed(() => {
  return router.currentRoute.value.matched.filter((it) => !it.meta?.hideBreadcrumb)
})
</script>

<template>
  <VbenSpace class="h-10 items-center" justify="space-between">
    <VbenBreadcrumb>
      <VbenBreadcrumbItem v-for="(i, k) in breadcrumbList" :key="k"
        >{{ t(i.meta.title) }}
        {{ i.children.length }}
      </VbenBreadcrumbItem>
    </VbenBreadcrumb>
    <div>123</div>
  </VbenSpace>
</template>
