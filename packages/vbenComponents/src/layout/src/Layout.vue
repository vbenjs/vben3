<script lang="ts" setup name="VbenLayout">
import { maps } from '#/index'
const Layout = maps.get('Layout')
</script>
<template>
  <Layout v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Layout>
</template>

<style scoped></style>
