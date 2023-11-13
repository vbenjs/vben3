<script lang="ts" setup name="VbenSteps">
import { maps } from '#/index'
const Steps = maps.get('Steps')
</script>
<template>
  <Steps v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Steps>
</template>

<style scoped></style>
