<script lang="ts" setup>
import SecondaryBorder from '../comm/SecondaryBorder.vue'
import { useAppConfig } from '@vben/hooks'

const { footer } = useAppConfig()
</script>
<template>
  <footer
    class="overflow-hidden relative bg-[rgb(250, 250, 252)] dark:bg-[var(--component-background-color)]"
    :class="[footer.visible ? 'visible' : 'invisible']"
  >
    footer
    <SecondaryBorder top />
  </footer>
</template>
