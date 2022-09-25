<script lang="ts" setup name="VbenStatistic">
import { maps } from '#/index'
const Statistic = maps.get('Statistic')
</script>
<template>
  <Statistic v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Statistic>
</template>

<style scoped></style>
