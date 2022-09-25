<template>
  <div :class="prefixCls">
    <VbenPopover title="" trigger="click">
      <template #trigger>
        <VbenBadge dot>
          <VbenIconify icon="mdi:bell-outline" color="rgb(51, 54, 57)" />
        </VbenBadge>
      </template>
      <VbenTabs
        class="w-60"
        animated
        type="line"
        justify-content="space-evenly"
      >
        <VbenTabPane
          v-for="item in listData"
          :key="item.key"
          :name="item.key"
          :tab="`${item.name}(${item.list.length})`"
        >
          <NoticeList
            :list="item.list"
            v-if="item.key === '1'"
            @title-click="onNoticeClick"
          />
          <NoticeList :list="item.list" v-else />
        </VbenTabPane>
      </VbenTabs>
    </VbenPopover>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { tabListData, ListItem } from './data'
import NoticeList from './NoticeList.vue'
import { useDesign } from '@/hooks/web/useDesign'

const { prefixCls } = useDesign('header-notify')

const listData = ref(tabListData)

function onNoticeClick(record: ListItem) {
  console.log('你点击了通知，ID=' + record.id)

  record.titleDelete = !record.titleDelete
}
</script>
<style lang="less">
.vben-header-notify {
  padding: 0 10px;
}
</style>
