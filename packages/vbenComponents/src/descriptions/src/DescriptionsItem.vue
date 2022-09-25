<script lang="ts" setup name="VbenDescItem">
import { maps } from '#/index'
const DescriptionsItem = maps.get('DescriptionsItem')
</script>
<template>
  <DescriptionsItem v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></DescriptionsItem>
</template>

<style scoped></style>
