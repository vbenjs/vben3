<script lang="ts" setup>
import { computed } from 'vue'
import sessionTimeoutLogin from '@/pages/sys/login/session-timeout-login.vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const getIsSessionTimeout = computed(() => userStore.getSessionTimeout)
</script>

<template>
  <session-timeout-login v-if="getIsSessionTimeout" />
</template>
