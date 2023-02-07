<script lang="ts" setup>
import TopButtonWrapper from '../comm/TopButtonWrapper.vue'
import avatar from '@/assets/images/header.jpg'
</script>
<template>
  <TopButtonWrapper>
    <div class="flex items-center">
      <img :src="avatar" class="rd-1/2 w-6 h-6 mr-3" alt="avatar" />
      <span>Vben Admin</span>
    </div>
  </TopButtonWrapper>
</template>
<style lang="scss" scoped></style>
