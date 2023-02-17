<script lang="ts" setup>
import { useAppConfig } from '@vben/hooks'

const { sidebar, toggleCollapse } = useAppConfig()
</script>
<template>
  <div
    class="h-24px w-24px cursor-pointer grid-center absolute top-1/2 right-0 z-1 rounded-1/2 translate-1/2 border border-solid border-[var(--trigger-background-color)] bg-[var(--trigger-background-color)] shadow shadow-color-[rgb(0 0 0 / 6%)]"
    @click.stop="toggleCollapse"
  >
    <VbenIconify
      :class="[sidebar.collapsed ? '-rotate-180' : 'rotate-0']"
      icon="ph:caret-left-bold"
      color="var(--aside-text-color)"
    />
  </div>
</template>
