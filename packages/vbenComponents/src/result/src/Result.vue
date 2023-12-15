<script lang="ts" setup>
defineOptions({ name: 'VbenResult' })
import { maps } from '../../index'

const Result = maps.get('Result')
</script>
<template>
  <Result v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Result>
</template>

<style scoped></style>
