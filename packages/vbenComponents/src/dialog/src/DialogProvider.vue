<script lang="ts" setup>
defineOptions({ name: 'VbenDialogProvider' })
import { maps } from '../../index'
const DialogProvider = maps.get('DialogProvider')
</script>
<template>
  <DialogProvider v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></DialogProvider>
</template>

<style scoped></style>
