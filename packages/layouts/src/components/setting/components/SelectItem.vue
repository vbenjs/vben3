<script lang="ts" setup name="SelectItem">
import { PropType, defineProps, defineEmits } from 'vue'
import { HandlerEnum } from "../constant";

defineProps({
  title: {type: String, default: ''},
  def: {
    type: [String, Number, Boolean] as PropType<string | number>,
  },
  event: {
    type: Number as PropType<HandlerEnum>,
  },
  disabled: {
    type: Boolean,
  },
  options: {type: Array, default: []},
})
const emits = defineEmits(['update:value'])
const onChange = (value)=>{
  emits('update:value', value)
}

</script>
<template>
  <div class="switch-item">
    <VbenSpace justify="space-between" align="center">
      <span>{{ title }}</span>
      <VbenSelect class="w-120px" :value="def" :options="options" :disabled="disabled" @update:value="onChange" />
    </VbenSpace>
  </div>
</template>
<style lang="less" scoped></style>
