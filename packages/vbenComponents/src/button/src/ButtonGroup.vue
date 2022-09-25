<script lang="ts" setup name="VbenButtonGroup">
  import {maps} from '../../index'
  const ButtonGroup = maps.get('ButtonGroup');
</script>
<template>
  <ButtonGroup v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></ButtonGroup>
</template>

<style scoped></style>
