<script lang="ts" setup>
import { useMenuSettingStore } from '../store'
import { storeToRefs } from '@vben/pinia'
import { MenuTypeEnum } from '@vben/constants'

const menuSettingStore = useMenuSettingStore()
const { type } = storeToRefs(menuSettingStore)

const options = [
  { label: MenuTypeEnum.SIDEBAR, value: MenuTypeEnum.SIDEBAR },
  { label: MenuTypeEnum.MIX, value: MenuTypeEnum.MIX },
  { label: MenuTypeEnum.TOP_MENU, value: MenuTypeEnum.TOP_MENU },
  { label: MenuTypeEnum.MIX_SIDEBAR, value: MenuTypeEnum.MIX_SIDEBAR },
]

const handlerChange = (value) => {
  menuSettingStore.setType(value)
}
</script>
<template>
  <main class="vben-grid-layout-main">
    {{ type }}
    <VbenSelect
      :options="options"
      :value="type"
      @update:value="handlerChange"
    />
    <!--    <RouterView />-->
  </main>
</template>
<style lang="scss" scoped></style>
