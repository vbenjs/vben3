<script setup lang="ts">
import { ref } from 'vue'
import { useClipboard } from '@vben/utils'

const input = ref('')
const { text, isSupported, copy, copied } = useClipboard()
</script>

<template>
  <VbenCard title="文本复制示例">
    <div v-if="isSupported">
      <VbenInputGroup>
        <VbenInput v-model:value="input" type="text" />
        <VbenButton @click="copy(input)">
          <!-- by default, `copied` will be reset in 1.5s -->
          <span v-if="!copied">Copy</span>
          <span v-else>Copied!</span>
        </VbenButton>
      </VbenInputGroup>
      <p>
        Current copied:
        <code>{{ text || 'none' }}</code>
      </p>
    </div>
    <p v-else>Your browser does not support Clipboard API</p>
  </VbenCard>
</template>
