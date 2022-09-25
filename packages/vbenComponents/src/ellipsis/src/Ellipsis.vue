<script lang="ts" setup name="VbenEllipsis">
import { maps } from '#/index'
const Ellipsis = maps.get('Ellipsis')
</script>
<template>
  <Ellipsis v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Ellipsis>
</template>

<style scoped></style>
