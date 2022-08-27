<template>
  <div class="flex p-x-2.5 cursor-pointer">
    <img :src="getUserInfo.avatar" class="avatar w-6 h-6 mr-3" alt="avatar" />
    <span>{{ getUserInfo.realName }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useUserStore } from '@/store/user';

import headerImg from '@/assets/images/header.jpg'

const userStore = useUserStore();

const getUserInfo = computed(() => {
  const { realName = 'Vben Admin', avatar, desc } = userStore.getUserInfo || {};

  return { realName, avatar: avatar || headerImg, desc };
});
</script>

<style scoped>
.avatar {
  border-radius: 50%;
}
</style>
