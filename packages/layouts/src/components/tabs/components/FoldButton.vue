<script setup lang="ts">
import { context } from '../../../../bridge'
import {computed, unref} from 'vue'
import { triggerWindowResize } from '@vben/utils'
const { useMenuSetting, useHeaderSetting } = context
const { getShowMenu, setMenuSetting } = useMenuSetting();
const { getShowHeader, setHeaderSetting } = useHeaderSetting();
const getIsUnFold = computed(() => !unref(getShowMenu) && !unref(getShowHeader));

const getIcon = computed(() =>
  unref(getIsUnFold) ? 'codicon:screen-normal' : 'codicon:screen-full',
);

function handleFold() {
  const isUnFold = unref(getIsUnFold);
  setMenuSetting({
    show: isUnFold,
    hidden: !isUnFold,
  });
  setHeaderSetting({ show: isUnFold });
  triggerWindowResize();
}

</script>

<template>
  <div @click="handleFold" class="h-full w-32px border-l flex-center border-[var(--n-border-color)] cursor-pointer">
    <VbenIconify :icon="getIcon"/>
  </div>
</template>

<style scoped lang="css"></style>
