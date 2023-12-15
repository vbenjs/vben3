<script lang="ts" setup>
import { msgNotifyList } from './data'
</script>

<template>
  <VbenCard title="新消息通知" :canExpan="false">
    <template v-for="item in msgNotifyList" :key="item.key">
      <VbenCard :title="item.title">
        <template #header-extra>
          <VbenSwitch
            class="float-right mt-10px mr-30px"
            checked-children="开"
            un-checked-children="关"
            default-checked
          />
        </template>
        <div>{{ item.description }}</div>
      </VbenCard>
    </template>
  </VbenCard>
</template>
