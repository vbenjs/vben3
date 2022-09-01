<script lang="ts" setup>
import { ref } from 'vue'

const Ref = ref(null)
</script>
<template>
  <div class="p-2">
    <VbenForm @register="" class="w-1/3" title="title" ref="Ref"
      >content</VbenForm
    >
  </div>
</template>
