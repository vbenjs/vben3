<script lang="ts" setup name="VbenNotificationProvider">
import { maps } from '#/index'
const NotificationProvider = maps.get('NotificationProvider')
</script>
<template>
  <NotificationProvider v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></NotificationProvider>
</template>

<style scoped></style>
