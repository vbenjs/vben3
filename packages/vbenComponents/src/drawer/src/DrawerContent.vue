<script lang="ts" setup name="VbenDrawerContent">
import { maps } from '#/index'
const DrawerContent = maps.get('DrawerContent')
</script>
<template>
  <DrawerContent v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></DrawerContent>
</template>

<style scoped></style>
