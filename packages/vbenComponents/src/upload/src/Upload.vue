<script lang="ts" setup>
defineOptions({ name: 'VbenUpload' })
import { maps } from '../../index'
const Upload = maps.get('Upload')
// const UploadDragger = maps.get('UploadDragger')
</script>
<template>
  <Upload v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </Upload>
</template>

<style scoped></style>
