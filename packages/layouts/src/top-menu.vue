<script lang="ts" setup>
import Header from './components/header.vue'
import Main from './components/main.vue'
import Container from './components/container.vue'
</script>
<template>
  <Container>
    <Header>
      <slot name="header"></slot>
    </Header>
    <Main>
      <slot name="main"></slot>
    </Main>
  </Container>
</template>
