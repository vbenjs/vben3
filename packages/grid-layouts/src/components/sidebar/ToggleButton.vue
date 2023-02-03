<script lang="ts" setup>
import { useMenuSettingStore } from '../../store'
import { storeToRefs } from '@vben/pinia'

const menuSettingStore = useMenuSettingStore()
const { isMixSidebar, collapsed } = storeToRefs(menuSettingStore)
</script>
<template>
  <div
    @click="menuSettingStore.toggleCollapsed()"
    :class="[
      'vben-grid-layout__toggle-button',
      { 'toggle-button--center': !isMixSidebar },
      { 'toggle-button--bottom': isMixSidebar },
    ]"
  >
    <VbenIconify
      v-if="isMixSidebar"
      :class="[collapsed ? '-rotate-180' : 'rotate-0']"
      color="rgba(255, 255, 255, .65)"
      hover-color="rgba(255, 255, 255, 1)"
      icon="ph:caret-double-left-bold"
    />
    <VbenIconify
      v-else
      :class="[collapsed ? '-rotate-180' : 'rotate-0']"
      icon="ph:caret-left-bold"
      color="var(--layout-toggle-button-icon-color)"
    />
  </div>
</template>
<style lang="scss" scoped>
.vben-grid-layout__toggle-button {
  transition: color 0.3s var(--transition-bezier),
    width 0.3s var(--transition-bezier), height 0.3s var(--transition-bezier),
    right 0.3s var(--transition-bezier), left 0.3s var(--transition-bezier),
    bottom 0.3s var(--transition-bezier),
    transform 0.3s var(--transition-bezier),
    border-color 0.3s var(--transition-bezier),
    background-color 0.3s var(--transition-bezier);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  //color: var(--layout-toggle-button-icon-color);
  z-index: 1;
  &.toggle-button--center {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    right: 0;
    border-radius: 50%;
    transform: translateX(50%) translateY(-50%);
    border: var(--layout-toggle-button-border);
    background-color: var(--layout-toggle-button-color);
    box-shadow: 0 2px 4px 0px rgb(0 0 0 / 6%);
  }
  &.toggle-button--bottom {
    width: 100%;
    height: 36px;
    position: absolute;
    background-color: #3b3b3b;
    bottom: 0;
  }
}
</style>
