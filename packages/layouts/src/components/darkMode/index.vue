<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
// import { ThemeEnum } from '@vben/constants'
// import { context } from '../../../bridge'
// const { useAppStore } = context
// const appStore = useAppStore()
// const isDark = computed(() => appStore.getDarkMode == ThemeEnum.DARK)
// const changeTheme = (v) => {
//   appStore.setDarkMode(v ? ThemeEnum.DARK : ThemeEnum.LIGHT)
// }

const props = defineProps({
  isDark: { type: Boolean, default: false }
})
const emit = defineEmits(['change']);

const onChange = (v)=>{
  emit('change',v)
}
</script>

<template>
  <VbenSwitch v-model:value="props.isDark" @update:value="onChange">
    <template #checked-icon>
      <VbenIconify icon="emojione:crescent-moon" hoverPointer />
    </template>
    <template #unchecked-icon>
      <VbenIconify icon="emojione:sun-with-face" hoverPointer />
    </template>
  </VbenSwitch>
</template>
