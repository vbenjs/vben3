<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMouse, useMousePressed } from '@vben/utils'
// 从父类获取必要数据
// fn 设置sider宽度函数
// width 当前sider宽度
// mix sider最小宽度
const props = defineProps({
  fn: {
    type: Function,
  },
  width: {
    type: Number,
  },
  mix: {
    type: Number,
  },
})
// 是否可拖拽
const canMove = ref(false)
// 前一个鼠标位置
const pX = ref(0)
// 当前鼠标位置
const { x } = useMouse()
// 检测鼠标是否按下
const { pressed } = useMousePressed()
//可拖拽，设置前一个鼠标位置
function mouseDown(e) {
  canMove.value = true
  pX.value = e.clientX
}
// 监控当前鼠标位置
watch(
  () => x.value,
  () => {
    if (!canMove.value) return
    const t = x.value - pX.value
    if (t == 0) return
    const n = props.width + t
    if (n < props.mix) return
    props.fn(n)
    pX.value = x.value
  },
)
// 监控鼠标按下状态
watch(
  () => pressed.value,
  () => {
    if (!pressed.value) {
      canMove.value = false
    }
  },
)
//TODO 左移后右移 有个迟滞情况
</script>

<template>
  <div
    class="dragbar absolute right-0 h-full w-1 hover:cursor-col-resize z-200"
    @mousedown="mouseDown"
  ></div>
</template>

<style scoped></style>
