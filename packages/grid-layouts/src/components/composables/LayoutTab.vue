<script lang="ts" setup>
import { useMultiTabsSettingStore } from '../../store'
import { storeToRefs } from 'pinia'
import TabRedo from '../tab-bar/TabRedo.vue'
import TabQuick from '../tab-bar/TabQuick.vue'
import FoldButton from '../tab-bar/FoldButton.vue'
import SecondaryBorder from '../comm/SecondaryBorder.vue'

const { hidden } = storeToRefs(useMultiTabsSettingStore())
const { showFold, showRedo, showQuick } = storeToRefs(
  useMultiTabsSettingStore(),
)
</script>
<template>
  <div
    class="grid-area-[grid-tab-bar] grid grid-cols-2 content-center overflow-hidden relative"
    :class="[hidden ? 'invisible' : 'visible']"
  >
    <div class="h-[var(--tab-bar-height)] grid-col-start-1 grid-col-end-3">
      Multiple Tab
    </div>
    <!--border-b border-[var(&#45;&#45;layout-border-color)]-->
    <div class="h-[var(--tab-bar-height)] grid-col-[min-content] flex relative">
      <TabRedo v-if="showRedo" />
      <TabQuick v-if="showQuick" />
      <FoldButton v-if="showFold" />
      <SecondaryBorder bottom />
    </div>
    <SecondaryBorder bottom />
  </div>
</template>
