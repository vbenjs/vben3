<script lang="ts" setup name="VbenTab">
import { maps } from '#/index'
import { ref } from 'vue'
const Tab = maps.get('Tab')
const Ref = ref(null)
defineExpose({ Ref })
</script>
<template>
  <Tab v-bind="$attrs" ref="Ref">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot></template
  ></Tab>
</template>

<style scoped></style>
