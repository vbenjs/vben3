<script lang="ts" setup name="SwitchItem">
import { PropType, defineProps, defineEmits } from 'vue'
import { HandlerEnum } from "../setting/constant";

defineProps({
  title: {type: String, default: ''},
  value: {
    type: [String, Number, Boolean] as PropType<string | number>,
  },
  event: {
    type: Number as PropType<HandlerEnum>,
  },
  disabled: {
    type: Boolean,
  },
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
      <VbenSwitch :value="value" :disabled="disabled" @update:value="onChange">
        <template #checked-icon>
          <VbenIconify icon="ant-design:check-outlined" color="#18A058" />
        </template>
        <template #unchecked-icon>
          <VbenIconify icon="ant-design:close-outlined" color="#DBDBDB" />
        </template>
      </VbenSwitch>
    </VbenSpace>
  </div>
</template>
<style lang="less" scoped></style>
