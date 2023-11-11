<template>
  <VbenModal :show="prop.show" @maskClick="() => prop.show = !prop.show">
    <VbenCard :title="prop.title" class="w-1/2" role="dialog">

      测试
    </VbenCard>
  </VbenModal>
</template>

<script setup>
const prop = defineProps({
  show: false,
  title: 弹出层,
})
</script>

