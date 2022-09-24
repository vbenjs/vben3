<script lang="ts" setup>
const props = defineProps(['onDelete', 'onEdit', 'key'])
import { VbenIconify } from '../../../iconify'
import { VbenPopconfirm } from '../../../popconfirm'
</script>
<template>
  <VbenSpace align="center"
    ><VbenIconify icon="ep:edit" @click="onEdit" />
    <VbenPopconfirm @PositiveClick="onDelete">
      <slot></slot>
      <template #trigger
        ><VbenIconify icon="ep:delete"></VbenIconify
      ></template> </VbenPopconfirm
  ></VbenSpace>
</template>
