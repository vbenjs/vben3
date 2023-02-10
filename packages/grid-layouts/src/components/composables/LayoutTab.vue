<script lang="ts" setup>
import TabRedo from '../tab-bar/TabRedo.vue'
import TabQuick from '../tab-bar/TabQuick.vue'
import FoldButton from '../tab-bar/FoldButton.vue'
import SecondaryBorder from '../comm/SecondaryBorder.vue'
import { useAppConfig } from '@vben/hooks'

const { tabTar } = useAppConfig()
</script>
<template>
  <div
    class="grid-area-[grid-tab-bar] grid grid-cols-2 content-center overflow-hidden relative dark:dark-800"
    :class="[tabTar.visible ? 'visible' : 'invisible']"
  >
    <div class="h-[var(--tab-bar-height)] grid-col-start-1 grid-col-end-3">
      Multiple Tab
    </div>
    <!--border-b border-[var(&#45;&#45;layout-border-color)]-->
    <div class="h-[var(--tab-bar-height)] grid-col-[min-content] flex relative">
      <TabRedo v-if="tabTar.showRedo" />
      <TabQuick v-if="tabTar.showQuick" />
      <FoldButton v-if="tabTar.showFold" />
      <SecondaryBorder bottom />
    </div>
    <SecondaryBorder bottom />
  </div>
</template>
