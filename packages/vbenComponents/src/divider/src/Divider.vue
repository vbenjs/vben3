<script lang="ts" setup name="VbenDivider">
import { maps } from '#/index'
const Divider = maps.get('Divider')
</script>
<template>
  <Divider v-bind="$attrs" class="text-sm text-gray">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Divider>
</template>

<style scoped></style>
