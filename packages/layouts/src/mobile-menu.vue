<script lang="ts" setup>
import LayoutMenu from './components/menu/index.vue'
import LayoutHeader from './components/header.vue'
import LayoutMain from './components/main.vue'
import LayoutFooter from './components/footer.vue'
import { context } from '../bridge'
import {onMounted, ref, unref} from "vue";
import { useComosables} from './useComosables'
const { useMenuSetting, Logo, useRootSetting } = context

const { getMenuWidth } = useMenuSetting()
const { getShowFooter } = useRootSetting();

const {headerRef, footerRef, contentStyle, mainStyle} = useComosables()

const active = ref(false);
onMounted(()=>{
  active.value = true
})
const activeTrigger = ()=>{
  active.value = !unref(active)
}
</script>
<template>
  <VbenLayout class="h-full min-w-375px">
    <VbenDrawer v-model:show="active" placement="left" :width="getMenuWidth">
      <VbenDrawerContent :body-content-style="{padding:0}">
        <LayoutMenu />
      </VbenDrawerContent>
    </VbenDrawer>
    <VbenLayoutHeader ref="headerRef">
      <slot name="header">
        <LayoutHeader>
          <template #logo>
            <VbenSpace align="center" :wrap-item="false">
              <Logo :show-title="false"/>
              <VbenIconify @click="activeTrigger" :icon="active?'menu-fold-outlined':'ant-design:menu-unfold-outlined'" size="24" hoverPointer/>
            </VbenSpace>
          </template>
        </LayoutHeader>
      </slot>
    </VbenLayoutHeader>
    <VbenLayout :content-style="contentStyle">
      <VbenLayoutContent :content-style="mainStyle">
        <LayoutMain>
          <slot name="main"></slot>
        </LayoutMain>
      </VbenLayoutContent>
      <VbenLayoutFooter v-if="getShowFooter" ref="footerRef">
        <slot name="footer">
          <LayoutFooter/>
        </slot>
      </VbenLayoutFooter>
    </VbenLayout>
  </VbenLayout>
</template>

<style scoped></style>
