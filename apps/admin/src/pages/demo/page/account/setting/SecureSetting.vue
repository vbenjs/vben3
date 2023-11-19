<script lang="ts" setup>
import { secureSettingList } from './data'
</script>
<template>
  <VbenCard title="安全设置">
    <template v-for="item in secureSettingList" :key="item.key">
      <VbenCard :title="item.title">
        <template #header-extra>
          <div
            class="float-right mt-10px mr-30px text-blue-500 text-font-normal cursor-pointer"
            v-if="item.extra"
          >
            {{ item.extra }}
          </div>
        </template>
        <div>{{ item.description }}</div>
      </VbenCard>
    </template>
  </VbenCard>
</template>

<style lang="less" scoped></style>
