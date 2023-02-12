<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps({
  closable: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
  title: { type: String },
})

const handleClose = ()=>{
  console.log('close')
}
</script>
<template>
  <div
    class="group py-2px pl-10px hover:text-[var(--n-tab-text-color-active)]"
    :class="[closable ? 'pr-10px' : 'pr-16px']"
  >
    <!--    @contextmenu="handleContextMenu($event, item)"-->
    <span>{{ title }}</span>
    <VbenIconify
      v-if="!closable"
      class="absolute !transition-all top-1/2 ml-2px
      mt--7px hover:!text-14px hover:nt--7px group-hover:visible"
      :class="[active ? 'visible': 'invisible']"
      size="12"
      icon="ep:close-bold"
      @click.stop="handleClose"
    />
    <!--    @click="handleClose($event, item)"-->
  </div>
</template>
