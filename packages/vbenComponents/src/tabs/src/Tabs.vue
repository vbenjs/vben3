<script lang="ts" setup name="VbenTabs">
import { maps } from '#/index'
import { ref } from 'vue'

const Tabs = maps.get('Tabs')
const Ref = ref(null)
defineExpose({ Ref })
</script>
<template>
  <Tabs v-bind="$attrs" ref="Ref">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Tabs>
</template>

<style scoped></style>
