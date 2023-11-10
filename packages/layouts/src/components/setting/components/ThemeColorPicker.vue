<script lang="ts" setup name="InputNumberItem">
import { PropType, ref } from 'vue'
import { ThemeChangeEnum } from '@vben/constants'
import { useAppTheme } from '@vben/hooks'

const { setThemeConfig } = useAppTheme()

const props = defineProps({
  title: { type: String, default: '' },
  def: {
    type: String as PropType<string>,
  },
  event: {
    type: Number as PropType<ThemeChangeEnum>,
    required: true,
  },
  disabled: {
    type: Boolean,
  },
  colorList: {
    type: Array,
  },
})

const color = ref(props.def)

const onChange = (color: string) => {
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
  <div class="min-w-83px">
    <VbenColorPicker
      v-model:value="color"
      :show-alpha="false"
      :modes="['hex']"
      :render-label="() => title"
      @complete="onChange"
      :swatches="colorList"
      @update:value="onChange"
    />
  </div>
</template>
<style lang="less" scoped></style>
