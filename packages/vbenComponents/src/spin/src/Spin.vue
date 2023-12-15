<script lang="ts" setup>
defineOptions({ name: 'VbenSpin' })
import { maps } from '../../index'

const Spin = maps.get('Spin')
</script>
<template>
  <Spin v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Spin>
</template>

<style scoped></style>
