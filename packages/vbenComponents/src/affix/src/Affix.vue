<script lang="ts" setup name="VbenAffix">
import { maps } from '#/index'

const Affix = maps.get('Affix')
</script>
<template>
  <Affix v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Affix>
</template>

<style scoped></style>
