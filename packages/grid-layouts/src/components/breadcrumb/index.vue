<script lang="ts" setup>
import { useSporadicSettingStore } from '../../store'
import { storeToRefs } from 'pinia'

const { showBreadCrumb } = storeToRefs(useSporadicSettingStore())
</script>
<template>
  <!--  <VbenBreadcrumb>-->
  <!--    <VbenBreadcrumbItem>-->
  <!--      -->
  <!--    </VbenBreadcrumbItem>-->
  <!--  </VbenBreadcrumb>-->
  <div v-if="showBreadCrumb">breadcrumb</div>
</template>
