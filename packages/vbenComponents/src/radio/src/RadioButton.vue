<script lang="ts" setup name="VbenRadioButton">
import { maps } from '#/index'
const RadioButton = maps.get('RadioButton')
</script>
<template>
  <RadioButton v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></RadioButton>
</template>

<style scoped></style>
