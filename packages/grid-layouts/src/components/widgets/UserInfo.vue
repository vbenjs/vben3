<script lang="ts" setup>
import TopButtonWrapper from '../comm/TopButtonWrapper.vue'
import { useAppInject, useSiteGeneral } from '@vben/hooks'

const { isMobile } = useAppInject()
const { avatar, username } = useSiteGeneral()
</script>
<template>
  <TopButtonWrapper>
    <div class="flex items-center">
      <img :src="avatar" class="rd-1/2 w-6 h-6" alt="avatar" />
      <span v-if="!isMobile && username" class="ml-3">{{ username }}</span>
    </div>
  </TopButtonWrapper>
</template>
<style lang="scss" scoped></style>
