<script lang="ts" setup name="VbenH5">
import { maps } from '#/index'
const H5 = maps.get('H5')
</script>
<template>
  <H5 v-bind="$attrs"> <slot></slot> </H5>
</template>

<style scoped></style>
