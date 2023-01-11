<script lang="ts" setup name="VbenGradientText">
import { maps } from '#/index'

const GradientText = maps.get('GradientText')
</script>
<template>
  <GradientText v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></GradientText>
</template>

<style scoped></style>
