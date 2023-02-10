<script lang="ts" setup>
import { useAppConfig } from '@vben/hooks'

const { sidebar, toggleCollapse } = useAppConfig()
</script>
<template>
  <div
    class="h-36px w-full absolute bottom-0 cursor-pointer grid-center bg-[#3b3b3b]"
    @click.stop="toggleCollapse"
  >
    <VbenIconify
      :class="[sidebar.collapsed ? '-rotate-180' : 'rotate-0']"
      color="rgba(255, 255, 255, .65)"
      hover-color="rgba(255, 255, 255, 1)"
      icon="ph:caret-double-left-bold"
    />
  </div>
</template>
