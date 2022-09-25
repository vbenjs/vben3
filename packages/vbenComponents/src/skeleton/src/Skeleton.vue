<script lang="ts" setup name="VbenSkeleton">
import { maps } from '#/index'

const Skeleton = maps.get('Skeleton')
</script>
<template>
  <Skeleton v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Skeleton>
</template>

<style scoped></style>
