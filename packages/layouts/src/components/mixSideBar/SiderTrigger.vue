<script lang="ts" setup>
import {context} from "../../../bridge";
import {createNamespace} from "@vben/utils";

const { useMenuSetting } = context
const { toggleCollapsed, getCollapsed } = useMenuSetting()

const { bem } = createNamespace('side-menu')

</script>
<template>
  <div :class="bem('trigger')" @click.stop="toggleCollapsed">
    <VbenIconify v-if="getCollapsed" icon="ph:caret-double-right-bold" />
    <VbenIconify v-else icon="ph:caret-double-left-bold" />
  </div>
</template>

<style lang="less" scoped>
.side-menu{
  &__trigger{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: 14px;
    color: rgb(255 255 255 / 65%);
    text-align: center;
    cursor: pointer;
    background-color: rgba(59, 59, 59, 1);
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>
