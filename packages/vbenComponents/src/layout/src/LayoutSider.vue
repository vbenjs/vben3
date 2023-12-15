<script lang="ts" setup>
defineOptions({ name: 'VbenLayoutSider' })
import { maps } from '../../index'

const LayoutSider = maps.get('LayoutSider')
</script>
<template>
  <LayoutSider
    v-bind="$attrs"
    collapsible
    :hide-trigger="!$attrs['show-trigger']"
  >
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></LayoutSider>
</template>

<style scoped></style>
