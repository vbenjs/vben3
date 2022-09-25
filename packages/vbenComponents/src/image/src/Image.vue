<script lang="ts" setup name="VbenImage">
import { maps } from '#/index'
const Image = maps.get('Image')
</script>
<template>
  <Image v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Image>
</template>

<style scoped></style>
