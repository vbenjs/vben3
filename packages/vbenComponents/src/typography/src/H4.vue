<script lang="ts" setup name="VbenH4">
import { maps } from '#/index'
const H4 = maps.get('H4')
</script>
<template>
  <H4 v-bind="$attrs"> <slot></slot> </H4>
</template>

<style scoped></style>
