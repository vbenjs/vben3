<script lang="ts" setup>
import { applicationList } from './data'

const prefixCls = 'account-center-application'

const cols = 4
</script>
<template>
  <div :class="prefixCls">
    <VbenGrid x-gap="12" :cols="cols">
      <template v-for="item in applicationList" :key="item.title">
        <VbenGridItem>
          <VbenCard :class="`${prefixCls}__card`" hoverable>
            <template #header>
              <div :class="`${prefixCls}__card-title`">
                <VbenIconify
                  class="icon"
                  v-if="item.icon"
                  :icon="item.icon"
                  :color="item.color"
                  size="24"
                />
                {{ item.title }}
              </div>
            </template>
            <div :class="`${prefixCls}__card-num`">
              活跃用户：<span>{{ item.active }}</span> 万
            </div>
            <div :class="`${prefixCls}__card-num`">
              新增用户：<span>{{ item.new }}</span>
            </div>

            <VbenIconify
              :class="`${prefixCls}__card-download`"
              v-if="item.download"
              :icon="item.download"
              :color="item.color"
              size="24"
            />
          </VbenCard>
        </VbenGridItem>
      </template>
    </VbenGrid>
  </div>
</template>

<style lang="less">
.account-center-application {
  &__card {
    width: 100%;
    margin-bottom: 12px;

    &-title {
      display: flex;
      align-items: center;

      .icon {
        font-size: 22px;
        margin-right: 5px;
      }
    }

    &-num {
      margin-left: 24px;
      line-height: 36px;
      color: rgb(0 0 0 / 45%);

      span {
        font-size: 18px;
      }
    }

    &-download {
      float: right;
      cursor: pointer;
    }
  }
}
</style>
