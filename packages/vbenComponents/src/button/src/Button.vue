<script lang="ts" setup name="VbenButton">
import { maps } from '#/index'
import { ref } from 'vue'
const Button = maps.get('Button')
const Ref = ref(null)
defineExpose({ Ref })
</script>
<template>
  <Button v-bind="$attrs" ref="Ref">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Button>
</template>

<style scoped></style>
