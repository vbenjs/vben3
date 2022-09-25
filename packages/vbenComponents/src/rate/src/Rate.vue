<script lang="ts" setup name="VbenRate">
import { maps } from '#/index'

const Rate = maps.get('Rate')
</script>
<template>
  <Rate v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Rate>
</template>

<style scoped></style>
