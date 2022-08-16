<script lang="ts" setup name="VbenModal">
  import {maps} from '../../index'
  import { computed } from 'vue';
  const Modal = maps.get('Modal');
  const props = defineProps({
    width: {
      type: [String, Number],
      default: '600px',
    },
  });
  const bodyStyle = computed(() => {
    return {
      width: props.width,
    };
  });
</script>
<template>
  <Modal v-bind="$attrs" :style="bodyStyle">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Modal>
</template>

<style scoped></style>
