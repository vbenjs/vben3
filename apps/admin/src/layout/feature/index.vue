<script lang="ts" setup>
import LayoutLockPage from '@/pages/sys/lock/index.vue'
const getTarget = () => document.body
</script>

<template>
  <layout-lock-page />
  <a-back-top :target="getTarget" />
</template>
