<script lang="ts" setup>
import SettingDrawer from "./SettingDrawer.vue";
import {ref} from "vue";

const settingDrawerVisible = ref(false)
</script>
<template>
  <VbenIconify
    icon="ion:settings-outline"
    hoverPointer
    @click="settingDrawerVisible = true"
  />
  <SettingDrawer v-model:visible="settingDrawerVisible" />
</template>
<style lang="scss" scoped></style>
