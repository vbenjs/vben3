<script lang="ts" setup>
import { Editor } from '@vben/demo'
import { ref } from "vue";

let tinymceHtml = ref('<h1>hello world!</h1>')

// 使用的时候自己去 https://www.tiny.cloud/auth/signup/ 申请一个key(免费的)，替换packages/demo/src/Editor/Editor.vue中的apiKey，不要用我这个

function getRichContent(html: any) {
  // 获取编辑器内容,内容变更时触发
  // console.log(html)
}
</script>

<template>
    <VbenCard title="富文本组件示例"/>
  <Editor :echo-data="tinymceHtml" @content="getRichContent" />
</template>

