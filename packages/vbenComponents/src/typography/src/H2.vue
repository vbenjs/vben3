<script lang="ts" setup name="VbenH2">
import { maps } from '#/index'
const H2 = maps.get('H2')
</script>
<template>
  <H2 v-bind="$attrs"> <slot></slot> </H2>
</template>

<style scoped></style>
