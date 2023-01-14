<script lang="ts" setup>
import { computed } from 'vue'
import { context } from '../../../bridge'
const { useUserStore, useAppInject } = context
import headerImg from '@/assets/images/header.jpg'

const userStore = useUserStore()

const {getIsMobile} = useAppInject()

const getUserInfo = computed(() => {
  const { realName = 'Vben Admin', avatar, desc } = userStore.getUserInfo || {}

  return { realName, avatar: avatar || headerImg, desc }
})
</script>
<template>
  <div class="flex cursor-pointer">
    <img :src="getUserInfo.avatar" class="avatar w-6 h-6 mr-3" alt="avatar" />
    <span v-if="!getIsMobile">{{ getUserInfo.realName }}</span>
  </div>
</template>
<style scoped>
.avatar {
  border-radius: 50%;
}
</style>
