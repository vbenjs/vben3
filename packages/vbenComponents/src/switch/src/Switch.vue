<script lang="ts" setup name="VbenSwitch">
import { maps } from '#/index'
const Switch = maps.get('Switch')
</script>
<template>
  <Switch v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Switch>
</template>

<style scoped></style>
