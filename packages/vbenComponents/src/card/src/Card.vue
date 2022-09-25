<script lang="ts" setup name="VbenCard">
import { maps } from '#/index'
const Card = maps.get('Card')
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>
<template>
  <Card v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <VbenSkeleton v-if="loading" text />
      <slot :name="item" v-bind="data || {}" v-else></slot> </template
  ></Card>
</template>

<style scoped></style>
