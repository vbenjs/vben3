<script lang="ts" setup>
import TopButtonWrapper from '../comm/TopButtonWrapper.vue'
import { tabListData, ListItem } from './data'
import NoticeList from './NoticeList.vue'
import { ref } from 'vue'

const listData = ref(tabListData)

function onNoticeClick(record: ListItem) {
  console.log('你点击了通知，ID=' + record.id)
  record.titleDelete = !record.titleDelete
}
</script>
<template>
  <VbenPopover title="" trigger="click">
    <template #trigger>
      <TopButtonWrapper>
        <!--    <VbenIconify icon="system-uicons:bell-ringing" />-->
        <VbenIconify icon="system-uicons:bell-snooze" />
      </TopButtonWrapper>
    </template>
    <VbenTabs class="w-60" animated type="line" justify-content="space-evenly">
      <VbenTabPane
        v-for="item in listData"
        :key="item.key"
        :name="item.key"
        :tab="`${item.name}(${item.list.length})`"
      >
        <NoticeList :list="item.list" @title-click="onNoticeClick" />
      </VbenTabPane>
    </VbenTabs>
  </VbenPopover>
</template>
