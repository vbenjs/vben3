<script lang="ts" setup name="VbenRadioGroup">
  import {maps} from '../../index'
  const RadioGroup = maps.get('RadioGroup');
</script>
<template>
  <RadioGroup v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></RadioGroup>
</template>

<style scoped></style>
