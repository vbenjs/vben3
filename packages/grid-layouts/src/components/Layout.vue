<script lang="ts" setup>
import LayoutHeader from "./LayoutHeader.vue";
import LayoutSidebar from "./LayoutSidebar.vue";
import LayoutContent from "./LayoutContent.vue";
import LayoutTab from "./LayoutTab.vue";
</script>
<template>
<section class="vben-grid-layout-container h-full w-full">
  <LayoutHeader />
  <LayoutSidebar />
  <LayoutTab />
  <LayoutContent />
</section>
</template>
<style lang="scss" scoped>
//.vben-grid-layout-container{
//  background: #666666;
//}
</style>
