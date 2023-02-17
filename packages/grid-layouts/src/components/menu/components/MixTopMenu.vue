<script lang="ts" setup>
import { ref, unref, nextTick, onMounted, watch } from 'vue'
import { renderMenuLabelToRouterLink } from '../renderMenu'
import { MenuModeEnum } from '@vben/constants'
import { getCurrentParentPath, getShallowMenus } from '@vben/router'
import { useRouter } from 'vue-router'
import { mapTree } from '@vben/utils'

const activeKey = ref(null)
const menuOptions = ref([])
const basicMenuRef = ref(null)
const { currentRoute } = useRouter()

const showOption = () => {
  nextTick(() => {
    if (!basicMenuRef.value) return
    basicMenuRef.value.Ref.showOption()
  })
}

onMounted(async () => {
  const menus = await getShallowMenus()
  if (menus.length) {
    menuOptions.value = mapTree(menus, {
      conversion: (menu) => renderMenuLabelToRouterLink(menu),
    })
  }
  showOption()
})

watch(
  () => unref(currentRoute).path,
  async (path: string) => {
    let parentPath = await getCurrentParentPath(path)
    if (parentPath) {
      activeKey.value = parentPath
    }
  },
  {
    immediate: true,
  },
)
</script>
<template>
  <VbenMenu
    v-if="menuOptions.length"
    v-model:value="activeKey"
    :options="menuOptions"
    :mode="MenuModeEnum.HORIZONTAL"
    :root-indent="12"
    ref="basicMenuRef"
  />
</template>
