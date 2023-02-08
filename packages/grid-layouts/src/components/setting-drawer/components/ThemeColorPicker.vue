<script lang="ts" setup name="ThemeColorPicker">
import { PropType } from 'vue'
import { HandlerSettingEnum } from '@vben/constants'
import { useAppConfig } from '@vben/hooks'

const props = defineProps({
  colorList: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  event: {
    type: Number as PropType<HandlerSettingEnum>,
  },
  def: {
    type: String,
    default: '',
  },
})

const { baseHandler } = useAppConfig()
const handleClick = (color) => {
  baseHandler(props.event, color)
}
</script>
<template>
  <div class="theme-color-picker">
    <VbenSpace justify="space-between" :size="0" :wrap="false">
      <template v-for="color in colorList" :key="color">
        <span
          @click="handleClick(color)"
          class="h-20px w-20px cursor-pointer border rounded-sm box-border border-gray-300 inline-block color-item"
          :class="{ active: def == color }"
          :style="{ background: color }"
        >
          <VbenSpace v-if="def == color" justify="center">
            <VbenIconify
              icon="mingcute:check-fill"
              color="#D1D5DB"
              size="18"
              hover-color="#D1D5DB"
            />
          </VbenSpace>
        </span>
      </template>
    </VbenSpace>
  </div>
</template>
<style lang="less" scoped>
.color-item {
  &:hover,
  &.active {
    border-color: rgba(6, 96, 189, 1);
  }
}
</style>
