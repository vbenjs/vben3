<script lang="ts" setup name="ThemeColorPicker">
import { PropType } from 'vue'
import { ThemeChangeEnum } from '@vben/constants'
import { useAppTheme } from '@vben/hooks'

const { setThemeConfig } = useAppTheme()

const props = defineProps({
  colorList: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  event: {
    type: Number as PropType<ThemeChangeEnum>,
    required: true,
  },
  def: {
    type: String,
    default: '',
  },
})

const handleClick = (color: string) => {
  switch (props.event) {
    case ThemeChangeEnum.THEME_PRIMARY_COLOR_CHANGE:
      setThemeConfig({ primaryColor: color })
      break
    case ThemeChangeEnum.THEME_INFO_COLOR_CHANGE:
      setThemeConfig({ infoColor: color })
      break
    case ThemeChangeEnum.THEME_SUCCESS_COLOR_CHANGE:
      setThemeConfig({ successColor: color })
      break
    case ThemeChangeEnum.THEME_WARNING_COLOR_CHANGE:
      setThemeConfig({ warningColor: color })
      break
    case ThemeChangeEnum.THEME_ERROR_COLOR_CHANGE:
      setThemeConfig({ errorColor: color })
      break
  }
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
              icon="ant-design:check-outlined"
              color="#D1D5DB"
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
