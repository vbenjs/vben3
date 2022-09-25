<script lang="ts" setup name="VbenH1">
import { maps } from '#/index'
const H1 = maps.get('H1')
</script>
<template>
  <H1 v-bind="$attrs"> <slot></slot> </H1>
</template>

<style scoped></style>
