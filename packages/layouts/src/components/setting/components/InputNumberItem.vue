<script lang="ts" setup>
defineOptions({ name: 'InputNumberItem' })
import { PropType } from 'vue'
import { HandlerSettingEnum } from '@vben/constants'
import { context } from '../../../../bridge'
const { useAppConfig } = context
const { baseHandler } = useAppConfig()

const props = defineProps({
  title: { type: String, default: '' },
  def: {
    type: [String, Number] as PropType<string | number>,
  },
  event: {
    type: Number as PropType<HandlerSettingEnum>,
    required: true,
  },
  disabled: {
    type: Boolean,
  },
  suffix: { type: String, default: '' },
})
const onChange = (value: any) => {
  baseHandler(props.event, value)
}
</script>
<template>
  <div class="switch-item">
    <VbenSpace justify="space-between" align="center">
      <span>{{ title }}</span>
      <VbenInputNumber
        class="w-130px"
        size="small"
        v-bind="$attrs"
        :value="def"
        :disabled="disabled"
        @update:value="onChange"
      >
        <template #suffix>
          {{ suffix }}
        </template>
      </VbenInputNumber>
    </VbenSpace>
  </div>
</template>
<style lang="less" scoped></style>
