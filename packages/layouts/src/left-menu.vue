<script lang="ts" setup>
import Aside from './components/aside.vue'
import Header from './components/header.vue'
import Main from './components/main.vue'
import Container from './components/container.vue'
// import LayoutBreadcrumb from './components/breadcrumb/index.vue'
</script>
<template>
  <VbenLayout has-sider class="h-full">
    <VbenLayoutSider show-trigger :collapsed-width="40" :width="160"
      ><slot name="sider"> </slot
    ></VbenLayoutSider>
    <VbenLayout>
      <VbenLayoutHeader> <slot name="header"> </slot></VbenLayoutHeader>
      <VbenLayoutContent><slot name="main"></slot></VbenLayoutContent>
      <!--    <Container>-->
      <!--    <Aside>-->
      <!--      -->
      <!--    </Aside>-->
      <!--      <Container>-->
      <!--    <Header>-->
      <!--      <slot name="header"></slot>-->
      <!--    </Header>-->
      <!--    <Main>-->
      <!--      <slot name="main"></slot>-->
      <!--    </Main>-->
      <!--      </Container>-->
      <!--    </Container>-->
    </VbenLayout>
  </VbenLayout>
</template>
