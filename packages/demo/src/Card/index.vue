<script lang="ts" setup>

import { ref } from 'vue'

const aSummary    = ref("基础卡片")
const aTitle      = ref('琵琶行')
const aContent    = ref('别有幽愁暗恨生，此时无声胜有声.')


</script>

<template>
  <div class="p-2">
    <h3>{{ aSummary }}</h3>
    <VbenCard class="w-1/3" :title="aTitle"> {{ aContent }} </VbenCard>
  </div>
</template>

