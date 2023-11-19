<template>
  <VbenCard>
    <div ref="wrapperRef" :class="prefixCls">
      <VbenTabs type="line" placement="left" :tabStyle="tabBarStyle">
        <VbenTabPane
          v-for="item in settingList"
          :key="item.key"
          :name="item.name"
        >
          <component :is="tabs[item.component]" />
        </VbenTabPane>
      </VbenTabs>
    </div>
  </VbenCard>
</template>

<script lang="ts" setup>
import { settingList } from './data'
import BaseSetting from './BaseSetting.vue'
import SecureSetting from './SecureSetting.vue'
import AccountBind from './AccountBind.vue'
import MsgNotify from './MsgNotify.vue'

const tabs = {
  BaseSetting,
  SecureSetting,
  AccountBind,
  MsgNotify,
}

const prefixCls = 'account-setting'
const tabBarStyle = {
  width: '220px',
}
</script>
<style lang="less">
.account-setting {
  margin: 12px;

  .base-title {
    padding-left: 0;
  }
}
</style>
