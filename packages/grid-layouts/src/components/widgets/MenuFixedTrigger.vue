<script lang="ts" setup>
import TopButtonWrapper from '../comm/TopButtonWrapper.vue'
import { useAppConfig } from '@vben/hooks'

const { menu, toggleMenuFixed } = useAppConfig()
</script>
<template>
  <TopButtonWrapper @click.stop="toggleMenuFixed">
    <VbenIconify
      size="22"
      :icon="menu.mixSideFixed ? 'ri:pushpin-2-fill' : 'ri:pushpin-2-line'"
    />
  </TopButtonWrapper>
</template>
