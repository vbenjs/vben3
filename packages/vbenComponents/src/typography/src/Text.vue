<script lang="ts" setup>
defineOptions({ name: 'VbenText' })
import { maps } from '../../index'
const Text = maps.get('Text')
</script>
<template>
  <Text v-bind="$attrs"> <slot></slot> </Text>
</template>

<style scoped></style>
