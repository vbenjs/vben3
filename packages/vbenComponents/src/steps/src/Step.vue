<script lang="ts" setup name="VbenStep">
import { maps } from '#/index'
const Step = maps.get('Step')
</script>
<template>
  <Step v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Step>
</template>

<style scoped></style>
