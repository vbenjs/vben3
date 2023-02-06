<script lang="ts" setup>
import { useSporadicSettingStore } from '../../store'
import { storeToRefs } from '@vben/pinia'

const { hiddenFooter } = storeToRefs(useSporadicSettingStore())
</script>
<template>
  <footer
    class="bg-[blueviolet] overflow-hidden"
    :class="[hiddenFooter ? 'invisible' : 'visible']"
  >
    footer
  </footer>
</template>
