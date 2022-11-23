<script lang="ts" setup name="ThemeColorPicker">
import {defineEmits, defineProps, PropType} from 'vue'

defineProps({
  colorList: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  def: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['handler']);
const handleClick = (color) => {
  emits('handler', color)
}
</script>
<template>
  <div class="theme-color-picker">
    <VbenSpace justify="space-between"
               :size="0"
               :wrap="false">
      <template v-for="color in colorList" :key="color">
      <span
        @click="handleClick(color)"
        class="h-20px w-20px cursor-pointer border rounded-sm box-border
         border-gray-300 inline-block color-item"
        :class="{ active: def == color }"
        :style="{ background: color }"
      >
        <VbenSpace v-if="def == color" justify="center">
          <VbenIconify icon="ant-design:check-outlined" color="#D1D5DB" hover-color="#D1D5DB"  />
        </VbenSpace>
      </span>
      </template>
    </VbenSpace>
  </div>
</template>
<style lang="less" scoped>
.color-item{
  &:hover,&.active{
    border-color: rgba(6,96,189,1);
  }
}
</style>
