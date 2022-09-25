<script lang="ts" setup name="VbenAvatar">
import { maps } from '#/index'

const Avatar = maps.get('Avatar')
</script>
<template>
  <Avatar v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Avatar>
</template>

<style scoped></style>
