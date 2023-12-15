<template>
  <transition name="fade-bottom" mode="out-in">
    <lock-page v-if="isLockPage" />
  </transition>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useLockStore } from '@/store/lock'
import LockPage from './lock-page.vue'

const lockStore = useLockStore()
const isLockPage = computed(() => lockStore?.getLockInfo?.isLock ?? false)
</script>
