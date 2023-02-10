<script lang="ts" setup>
import SecondaryBorder from '../comm/SecondaryBorder.vue'
import { useAppConfig } from '@vben/hooks'

const { footer } = useAppConfig()
</script>
<template>
  <footer
    class="overflow-hidden relative"
    :class="[footer.visible ? 'visible' : 'invisible']"
  >
    footer
    <SecondaryBorder top />
  </footer>
</template>
