<script lang="ts" setup>
import * as monaco from 'monaco-editor'
import { onMounted, ref } from 'vue'
let editor = ref(null)
onMounted(() => {
  initEditor()
})
const initEditor = () => {
  // Initialize editor , Make sure dom Has rendered
  editor.value = monaco.editor.create(document.getElementById('codeEditBox'), {
    value: 'console.log("Hello, world")',
    language: 'javascript',
  })
}
</script>
<template>
  <div id="codeEditBox" style="height: 70vh"></div>
</template>
