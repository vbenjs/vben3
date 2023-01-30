<script lang="ts" setup>
import {useTest} from "@/store/test";

const useTestState = useTest()

// useTestState.$persist()
</script>
<template>
  <div class="p-4">analysis {{ useTestState.test }}</div>
</template>
