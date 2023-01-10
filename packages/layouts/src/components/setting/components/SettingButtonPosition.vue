<script lang="ts" setup>
import SettingDrawer from "./SettingDrawer.vue";
import {ref} from "vue";

const settingDrawerVisible = ref(false)
</script>
<template>
  <VbenAffix @click="settingDrawerVisible = true"
             class="z-999 p-10px flex-center text-white border-rd-l bg-[#0960bd] right-0 !top-1/2 cursor-pointer"
             :trigger-top="360"
             listen-to="body">
    <VbenIconify
      icon="ion:settings-outline"
      hoverPointer
    />
  </VbenAffix>
  <SettingDrawer v-model:visible="settingDrawerVisible" />
</template>
<style lang="scss" scoped></style>
