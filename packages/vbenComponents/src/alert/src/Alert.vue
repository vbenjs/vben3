<script lang="ts" setup>
defineOptions({ name: 'VbenAlert' })
import { maps } from '../../index'

const Alert = maps.get('Alert')
</script>
<template>
  <div>
    <Alert v-bind="$attrs">
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </Alert>
  </div>
</template>

<style lang="less" scoped></style>
