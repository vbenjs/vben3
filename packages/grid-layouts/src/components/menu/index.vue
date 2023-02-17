<script lang="ts" setup>
import BasicMenu from './components/BasicMenu.vue'
import { mapTree } from '@vben/utils'
import { getMenus } from '@vben/router'
import { nextTick, onMounted, ref } from 'vue'
import { renderMenuLabelToRouterLink } from './renderMenu'

const menuRef = ref(null)
const menuOptions = ref([])
const showOption = () => {
  nextTick(() => {
    if (!menuRef.value) return
    menuRef.value.showOption()
  })
}
onMounted(async () => {
  const menus = await getMenus()
  menuOptions.value = mapTree(menus, {
    conversion: (menu) => renderMenuLabelToRouterLink(menu),
  })
  showOption()
})
</script>
<template>
  <VbenScrollbar>
    <BasicMenu ref="menuRef" :menu-options="menuOptions" />
  </VbenScrollbar>
</template>
<style lang="scss" scoped></style>
