<script lang="ts" setup>
import TabRedo from '../tabs-bar/components/TabRedo.vue'
import TabQuick from '../tabs-bar/components/TabQuick.vue'
import FoldButton from '../tabs-bar/components/FoldButton.vue'
import SecondaryBorder from '../comm/SecondaryBorder.vue'
import TabBar from '../tabs-bar/index.vue'
import { useAppConfig } from '@vben/hooks'

const { tabTar } = useAppConfig()
</script>
<template>
  <div
    class="grid-area-[grid-tab-bar] grid grid-cols-2 content-center overflow-hidden relative dark:bg-[var(--component-background-color)]"
    :class="[tabTar.visible ? 'visible' : 'invisible']"
  >
    <div
      class="h-[var(--tab-bar-height)] grid-col-start-1 grid-col-end-3 flex items-end"
    >
      <TabBar />
    </div>
    <div class="h-[var(--tab-bar-height)] grid-col-[min-content] flex relative">
      <TabRedo v-if="tabTar.showRedo" />
      <TabQuick v-if="tabTar.showQuick" :tab-item="$route" />
      <FoldButton v-if="tabTar.showFold" />
      <SecondaryBorder bottom />
    </div>
  </div>
</template>
