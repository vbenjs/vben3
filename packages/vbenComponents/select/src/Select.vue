<script lang="ts" setup name="VbenSelect">
  import {maps} from '../../index'
  const Select = maps.get('Select');
</script>
<template>
  <Select v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Select>
</template>

<style scoped></style>
