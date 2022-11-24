<script lang="ts" setup name="InputNumberItem">
import { PropType, defineProps } from 'vue'
import { HandlerSettingEnum } from "@vben/constants";
import {baseHandler} from "../handler";

const props = defineProps({
  title: {type: String, default: ''},
  def: {
    type: [String, Number] as PropType<string | number>,
  },
  event: {
    type: Number as PropType<HandlerSettingEnum>,
  },
  disabled: {
    type: Boolean,
  },
  suffix: {type: String, default: ''},
})
const onChange = (value)=>{
  baseHandler(props.event, value)
}
</script>
<template>
  <div class="switch-item">
    <VbenSpace justify="space-between" align="center">
      <span>{{ title }}</span>
      <VbenInputNumber class="w-130px" size="small" v-bind="$attrs" :value="def" :disabled="disabled" @update:value="onChange">
        <template #suffix>
          {{ suffix }}
        </template>
      </VbenInputNumber>
    </VbenSpace>
  </div>
</template>
<style lang="less" scoped></style>
