<script lang="ts" setup>
import SuffixItemWrapper from '../../comm/SuffixItemWrapper.vue'
import { useAppConfig } from '@vben/hooks'
const { tabTar } = useAppConfig()
</script>
<template>
  <SuffixItemWrapper v-if="tabTar.showQuick">
    <VbenIconify
      icon="material-symbols:double-arrow-rounded"
      class="rotate-90"
      rotate="90deg"
    />
  </SuffixItemWrapper>
</template>
