<script lang="ts" setup name="InputNumberItem">
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
  suffix: {type: String, default: ''},
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
      <VbenInputNumber class="w-120px" v-bind="$attrs" :value="def" :disabled="disabled" @update:value="onChange">
        <template #suffix>
          {{ suffix }}
        </template>
      </VbenInputNumber>
    </VbenSpace>
  </div>
</template>
<style lang="less" scoped></style>
