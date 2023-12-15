<script lang="ts" setup>
import { actions, articleList } from './data'

const prefixCls = 'account-center-article'

const cardStyle = {
  padding: '10px',
  paddingBottom: '0',
}
</script>
<template>
  <div item-layout="vertical" :class="prefixCls">
    <template v-for="item in articleList" :key="item.title">
      <VbenCard
        hoverable
        bordered
        :title="item.title"
        :header-style="cardStyle"
        :content-style="cardStyle"
      >
        <template v-for="tag in item.description" :key="tag">
          <VbenTag class="m-1">
            {{ tag }}
          </VbenTag>
        </template>
        <div :class="`${prefixCls}__content`" class="m-1">
          {{ item.content }}
        </div>
        <template v-for="action in actions" :key="action.text">
          <div :class="`${prefixCls}__action`">
            <div
              :class="`${prefixCls}__action-item`"
              class="flex items-center"
              v-if="action.icon"
            >
              <VbenIconify
                :icon="action.icon"
                :color="action.color"
                size="18"
              />
              <VbenText class="ml-1" depth="4"> {{ action.text }} </VbenText>
            </div>
          </div>
        </template>
        <span :class="`${prefixCls}__time`">{{ item.time }}</span>
      </VbenCard>
    </template>
  </div>
</template>
<style lang="less" scoped>
.account-center-article {
  &__content {
    color: rgb(0 0 0 / 45%);
    margin: 10px 0;
    overflow: hidden;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &__action {
    display: inline-block;
    padding-left: 16px;
    &-item {
      &:nth-child(1),
      &:nth-child(2) {
        padding-right: 16px;
        border-right: 1px solid rgb(206 206 206 / 40%);
      }
    }
  }

  &__time {
    position: absolute;
    right: 20px;
    color: rgb(0 0 0 / 45%);
  }
}
</style>
