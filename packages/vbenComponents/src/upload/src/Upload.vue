<script lang="ts" setup name="VbenUpload">
import { maps } from '#/index'
const Upload = maps.get('Upload')
const UploadDragger = maps.get('UploadDragger')
</script>
<template>
  <Upload v-bind="$attrs" directory-dnd>
    <UploadDragger
      ><template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot> </template
    ></UploadDragger>
  </Upload>
</template>

<style scoped></style>
