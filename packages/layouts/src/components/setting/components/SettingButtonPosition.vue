<script lang="ts" setup>
import SettingDrawer from "./SettingDrawer.vue";
import {ref} from "vue";
import {useComosables} from "../../../useComosables";

const settingDrawerVisible = ref(false)
const {contentRef} = useComosables()
</script>
<template>
  <VbenAffix @click="settingDrawerVisible = true"
             class="z-999 p-10px flex-center text-white border-rd-l bg-[#0960bd] right-0 !top-2/5 cursor-pointer"
             :trigger-top="240"
             :listen-to="contentRef">
    <VbenIconify
      icon="ion:settings-outline"
      hoverPointer
    />
  </VbenAffix>
  <SettingDrawer v-model:visible="settingDrawerVisible" />
</template>
<style lang="scss" scoped></style>
