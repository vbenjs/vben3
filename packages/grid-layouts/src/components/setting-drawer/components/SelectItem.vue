<script lang="ts" setup name="SelectItem">
import { PropType, h } from 'vue'
import { HandlerSettingEnum } from '@vben/constants'
import { useI18n } from '@vben/locale'
import { useAppConfig } from '@vben/hooks'

const { t } = useI18n()

const props = defineProps({
  title: { type: String, default: '' },
  def: {
    type: [String, Number] as PropType<string | number>,
  },
  event: {
    type: Number as PropType<HandlerSettingEnum>,
  },
  disabled: {
    type: Boolean,
  },
  options: { type: Array, default: () => [] },
})

const { baseHandler } = useAppConfig()
const onChange = (value) => {
  baseHandler(props.event, value)
}
/*
 * options 数据传入时,多语言会失效,这里再渲染一遍
 * */
function renderLabel(option: { label: string; value: string | number }) {
  return h('span', {}, t(option.label))
}
</script>
<template>
  <div class="switch-item">
    <VbenSpace justify="space-between" align="center">
      <span>{{ title }}</span>
      <VbenSelect
        class="w-130px"
        size="small"
        :value="def"
        :options="options"
        :disabled="disabled"
        @update:value="onChange"
        :render-label="renderLabel"
      />
    </VbenSpace>
  </div>
</template>
<style lang="less" scoped></style>
