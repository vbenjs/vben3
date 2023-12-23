<script lang="ts" setup>
import { testRetry } from '@/apis/sys/user'
const handleClick = async () => {
  await testRetry()
}
</script>

<template>
  <div class="m-10">
    <VbenButton @click="handleClick" type="primary">
      点击会重新发起请求5次
    </VbenButton>
    <p class="mt-4">打开浏览器的network面板，可以看到发出了六次请求</p>
  </div>
</template>
