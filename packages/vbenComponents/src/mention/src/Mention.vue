<script lang="ts" setup name="VbenMention">
import { maps } from '#/index'

const Mention = maps.get('Mention')
</script>
<template>
  <Mention v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Mention>
</template>

<style scoped></style>
