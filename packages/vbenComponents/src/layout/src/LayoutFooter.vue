<script lang="ts" setup name="VbenLayoutFooter">
import { maps } from '#/index'

const LayoutFooter = maps.get('LayoutFooter')
</script>
<template>
  <LayoutFooter v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></LayoutFooter>
</template>

<style scoped></style>
