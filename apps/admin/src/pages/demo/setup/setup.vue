<script lang="ts" setup>
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

const steps = [
  {
    element: '.app-logo.layout-menu__logo',
    popover: {
      title: 'Welcome',
      description: 'Hello World! 👋',
    },
  },
  {
    element: `.n-layout-toggle-button`,
    popover: {
      title: 'Collapse Button',
      description: 'This is the menu collapse button.',
    },
  },
  {
    element: `#userActionElement`,
    popover: {
      title: 'User Action',
      description: 'This is the user function area.',
    },
  },
]

const handleStart = () => {
  driver({
    showProgress: true,
    steps: steps,
  }).drive()
}
</script>
<template>
  <VbenCard>
    <VbenCard title="引导页">
      用于给用户的指引操作。
      <a href="https://driverjs.com" target="_blank" rel="noopener noreferrer"
        >更多用法</a
      >
      <template #footer>
        <VbenButton type="primary" @click="handleStart">开始</VbenButton>
      </template>
    </VbenCard>
  </VbenCard>
</template>
