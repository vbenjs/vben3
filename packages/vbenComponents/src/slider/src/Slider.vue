<script lang="ts" setup name="VbenSlider">
import { maps } from '#/index'

const Slider = maps.get('Slider')
</script>
<template>
  <Slider v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Slider>
</template>

<style scoped></style>
