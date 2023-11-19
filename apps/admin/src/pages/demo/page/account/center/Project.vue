<script lang="ts" setup>
import demoImg from '@/assets/images/demo.png'
import { projectList } from './data'

const prefixCls = 'account-center-project'
const cols = 4
</script>
<template>
  <VbenList :class="prefixCls">
    <VbenGrid x-gap="12" :cols="cols">
      <template v-for="item in projectList" :key="item.title">
        <VbenGridItem>
          <VbenListItem>
            <VbenCard hoverable :class="`${prefixCls}__card`">
              <img :src="demoImg" />
              <div :class="`${prefixCls}__card-title`">
                {{ item.title }}
              </div>
              <div :class="`${prefixCls}__card-content`">
                {{ item.content }}
              </div>
            </VbenCard>
          </VbenListItem>
        </VbenGridItem>
      </template>
    </VbenGrid>
  </VbenList>
</template>

<style lang="less">
.account-center-project {
  &__card {
    width: 100%;
    max-width: 400px;
    // min-width: 200px;
    img {
      width: 100%;
      height: 130px;
    }

    &-title {
      margin: 5px 10px;
      color: rgb(0 0 0 / 85%);
      font-size: 16px;
      font-weight: 500;
    }

    &-content {
      margin: 5px 10px;
      overflow: hidden;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
