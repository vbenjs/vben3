<script lang="ts" setup>

import { ref, reactive } from 'vue'

const aTitle = ref<string>('基础卡片')
const aContent = ref('别有幽愁暗恨生，此时无声胜有声.')
let tabsType = ref<string>('line')
const radioArr = reactive([{ value: 'line', label: 'line' }, { value: 'bar', label: 'bar' }, { value: 'card', label: 'card' }, { value: 'segment', label: 'segment' }])

function radioChange(e: Event) {
  tabsType.value = (e.target as HTMLInputElement).value
  return console.log('val ->', (e.target as HTMLInputElement).value);
}

function handleClose() {
  return 
}
</script>

<template>
  <div class="p-2 h-full grid grid-cols-12  gap-4">

    <div class="col-start-1 col-span-6 ">
      <VbenCard :title="aTitle"> {{ aContent }} </VbenCard>
    </div>

    <div class="col-start-7 col-span-6 ">
      <VbenCard contentStyle="padding: 0">
        <VbenTabs :type="tabsType" size="large" :tabsPadding="20" paneStyle="padding: 20px;">
          <VbenTabPane name="tabs1">
            这是一个Tabs卡片(👁️🐽👁️)
            <p> 你可以选择Tabs的类型: </p>
            <!-- TODO: VbenRadioGroup似乎有bug,点击后的样式无法正常显示 -->
            <!-- TODO: VbenRadioGroup tabsType设置默认值后不起作用 -->
            <VbenRadioGroup name="radio-group" :value="tabsType" :options="radioArr"
              @change="radioChange" />
          </VbenTabPane>
          <VbenTabPane name="tabs2">我本将心向明月,奈何明月照沟渠.</VbenTabPane>
        </VbenTabs>
      </VbenCard>
    </div>

    <div class="col-start-1 col-span-3">
      <VbenCard title="带封面的卡片" hoverable>
        <template #cover>
          <img src="@/assets/images/cover.png" alt="cover.png">
        </template>
        样式丰富了许多,不是吗🥳
      </VbenCard>
    </div>

    <div class="col-start-7 col-span-6">
      <VbenCard title="提示" closable @close="handleClose">
        有时候我们需要在插槽里定制一些丰富的交互🤔
        <template #action>
          <VbenSpace>
            <VbenButton strong secondary type="tertiary">不用了</VbenButton>
            <VbenButton strong secondary type="primary">确定</VbenButton>
          </VbenSpace>
        </template>
      </VbenCard>
    </div>

  </div>
</template>

