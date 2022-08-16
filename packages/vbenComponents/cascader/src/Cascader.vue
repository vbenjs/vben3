<script lang="ts" setup name="VbenCascader">
  import {maps} from '../../index'
  const Cascader = maps.get('Cascader');
</script>
<template>
  <Cascader v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Cascader>
</template>

<style scoped></style>
