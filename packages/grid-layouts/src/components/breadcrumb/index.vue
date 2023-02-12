<script lang="ts" setup>
import { useAppConfig } from '@vben/hooks'

const { header } = useAppConfig()
</script>
<template>
  <VbenBreadcrumb v-if="header.showBreadCrumb" class="grid-center">
    <VbenBreadcrumbItem> 首页 </VbenBreadcrumbItem>

    <VbenBreadcrumbItem> test </VbenBreadcrumbItem>
  </VbenBreadcrumb>
</template>
