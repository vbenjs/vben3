<script lang="ts" setup name="VbenButton">
  import {maps} from '../../index'
  const Button = maps.get('Button');
</script>
<template>
  <Button v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Button>
</template>

<style scoped></style>
