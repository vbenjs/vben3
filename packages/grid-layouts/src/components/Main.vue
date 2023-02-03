<script lang="ts" setup>
import {
  useLayoutHeader,
  useMenuSettingStore
} from '../store'
import { storeToRefs } from '@vben/pinia'
import { MenuTypeEnum } from '@vben/constants'
import {useComprehensive} from "../hooks/useComprehensive";

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

const { headerWidth, headerHeight } = storeToRefs(useLayoutHeader())

const { getLayoutStyles } = useComprehensive()

</script>
<template>
  <main class="vben-grid-layout-main">
    {{ type }}
    <VbenSelect
      :options="options"
      :value="type"
      @update:value="handlerChange"
    />
    <div>layoutStyles： {{ getLayoutStyles }}</div>
    <div>headerWidth: {{ headerWidth }}, headerHeight: {{ headerHeight }}</div>
    <!--    <RouterView />-->
  </main>
</template>
<style lang="scss" scoped></style>
