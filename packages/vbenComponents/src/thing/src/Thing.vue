<script lang="ts" setup name="VbenThing">
import { maps } from '#/index'
const Thing = maps.get('Thing')
</script>
<template>
  <Thing v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Thing>
</template>

<style scoped></style>
