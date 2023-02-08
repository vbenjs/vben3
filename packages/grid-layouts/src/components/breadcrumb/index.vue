<script lang="ts" setup>
import { useAppConfig } from '@vben/hooks'

const { header } = useAppConfig()
</script>
<template>
  <!--  <VbenBreadcrumb>-->
  <!--    <VbenBreadcrumbItem>-->
  <!--      -->
  <!--    </VbenBreadcrumbItem>-->
  <!--  </VbenBreadcrumb>-->
  <div v-if="header.showBreadCrumb">breadcrumb</div>
</template>
