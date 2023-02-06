<script lang="ts" setup>
import { useMultiTabsSettingStore } from '../../store'
import { storeToRefs } from '@vben/pinia'
import TabRedo from '../tab-bar/TabRedo.vue'
import TabQuick from '../tab-bar/TabQuick.vue'
import FoldButton from '../tab-bar/FoldButton.vue'

const { hidden } = storeToRefs(useMultiTabsSettingStore())
const { showFold, showRedo, showQuick } = storeToRefs(
  useMultiTabsSettingStore(),
)
</script>
<template>
  <div
    class="grid-area-[grid-tab-bar] bg-[#0960bd] grid grid-cols-2 content-center"
    :class="[hidden ? 'invisible' : 'visible']"
  >
    <div class="h-[var(--tab-bar-height)] grid-col-start-1 grid-col-end-3">
      Multiple Tab
    </div>
    <!--border-b border-[var(&#45;&#45;layout-border-color)]-->
    <div class="h-[var(--tab-bar-height)] grid-col-[min-content] flex">
      <TabRedo v-if="showRedo" />
      <TabQuick v-if="showQuick" />
      <FoldButton v-if="showFold" />
    </div>
  </div>
</template>
