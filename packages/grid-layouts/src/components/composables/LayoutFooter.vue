<script lang="ts" setup>
import { useSporadicSettingStore } from '../../store'
import { storeToRefs } from 'pinia'
import SecondaryBorder from '../comm/SecondaryBorder.vue'

const { hiddenFooter } = storeToRefs(useSporadicSettingStore())
</script>
<template>
  <footer
    class="overflow-hidden relative"
    :class="[hiddenFooter ? 'invisible' : 'visible']"
  >
    footer
    <SecondaryBorder top />
  </footer>
</template>
