<script lang="ts" setup name="VbenList">
import { maps } from '#/index'
const ListItem = maps.get('ListItem')
</script>
<template>
  <ListItem v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></ListItem>
</template>

<style scoped></style>
