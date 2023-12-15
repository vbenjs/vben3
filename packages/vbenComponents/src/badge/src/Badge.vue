<script setup lang="ts">
defineOptions({ name: 'VbenBadge' })
import { maps } from '../../index'

const Badge = maps.get('Badge')
</script>
<template>
  <Badge v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Badge>
</template>

<style scoped></style>
