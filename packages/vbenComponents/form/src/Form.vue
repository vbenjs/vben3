<script lang="ts" setup name="VbenForm">
  import { maps } from '../../index';

  const Form = maps.get('Form');
  //
  // let domRef = ref();
  //
  // defineExpose({
  //   domRef
  // });
</script>
<template>
  <Form ref="domRef" v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template
    >
  </Form>
</template>

<style scoped></style>
