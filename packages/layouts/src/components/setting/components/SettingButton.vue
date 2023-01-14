<script lang="ts" setup>
import SettingDrawer from "./SettingDrawer.vue";
import {ref} from "vue";

const settingDrawerVisible = ref(false)
</script>
<template>
  <div class="flex items-center">
    <VbenIconify
      icon="ion:settings-outline"
      hoverPointer
      @click="settingDrawerVisible = true"
    />
    <SettingDrawer v-model:visible="settingDrawerVisible"/>
  </div>
</template>
<style lang="scss" scoped></style>
