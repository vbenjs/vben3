<script lang="ts" setup>
import { ref, unref, nextTick, onMounted, watch } from 'vue'
import { renderMenuLabelToRouterLink } from '../renderMenu'
import { useAppConfig } from '@vben/hooks'
import { MenuModeEnum } from '@vben/constants'
import { getCurrentParentPath, getShallowMenus } from '@vben/router'
import { useRouter } from 'vue-router'
import { mapTree } from '@vben/utils'
const { menu } = useAppConfig()

defineProps({
  mode: {
    type: String,
    default: () => MenuModeEnum.VERTICAL,
  },
})

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
  menuOptions.value = mapTree(menus, {
    conversion: (menu) => renderMenuLabelToRouterLink(menu),
  })
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
    v-model:value="activeKey"
    :dropdown-placement="menu.dropdownPlacement"
    :options="menuOptions"
    :mode="mode"
    :root-indent="12"
    ref="basicMenuRef"
  />
</template>
