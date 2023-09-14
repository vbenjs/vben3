<script setup lang="ts">
import { computed, unref } from 'vue'
import { triggerWindowResize } from '@vben/utils'
import { useMenuSetting, useHeaderSetting } from '@vben/hooks'
const { getShowMenu, setMenuSetting } = useMenuSetting()
const { getShowHeader, setHeaderSetting } = useHeaderSetting()
const getIsUnFold = computed(() => !unref(getShowMenu) && !unref(getShowHeader))

const getIcon = computed(() =>
  unref(getIsUnFold) ? 'codicon:screen-normal' : 'codicon:screen-full',
)
function handleFold() {
  // 设置菜单和头部是否显示
  const show = unref(getIsUnFold)

  setMenuSetting({ show })
  setHeaderSetting({ show })

  triggerWindowResize()
}
</script>

<template>
  <div
    @click="handleFold"
    class="h-full w-32px border-l flex-center border-[var(--n-border-color)] cursor-pointer"
  >
    <VbenIconify :icon="getIcon" />
  </div>
</template>

<style scoped lang="css"></style>
