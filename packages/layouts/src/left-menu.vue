<script lang="ts" setup>
import Aside from './components/aside.vue'
import Header from './components/header.vue'
import Main from './components/main.vue'
import Container from './components/container.vue'
</script>
<template>
  <Container>
    <Aside>
      <slot name="aside"></slot>
    </Aside>
    <Container>
      <Header>
        <slot name="header"></slot>
      </Header>
      <Main>
        <slot name="main"></slot>
      </Main>
    </Container>
  </Container>
</template>
