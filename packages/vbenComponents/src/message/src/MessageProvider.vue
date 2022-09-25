<script lang="ts" setup name="VbenMessageProvider">
import { maps } from '#/index'
const MessageProvider = maps.get('MessageProvider')
</script>
<template>
  <MessageProvider v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></MessageProvider>
</template>

<style scoped></style>
