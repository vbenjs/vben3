<template>
  <div :class="getClass" ref="wrapperRef">
    <VbenPageHeader :title="title" v-bind="omit($attrs, 'class')" ref="headerRef" v-if="getShowHeader">
      <template #default>
        <template v-if="content">
          {{ content }}
        </template>
        <slot v-else name="headerContent"></slot>
      </template>
      <template #[item]="data" v-for="item in getHeaderSlots">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </VbenPageHeader>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue';
import { omit } from '@vben/utils';
import { useDesign } from '@vben/hooks'


const props = defineProps({
  content: String,
  title: String
})

const attrs = useAttrs()
const slots = useSlots()

const { prefixCls } = useDesign('page-wrapper');

const getClass = computed(() => {
  return [
    prefixCls,
    attrs.class ?? {},
  ];
});

const getShowHeader = computed(() => props.content || props.title)


const getHeaderSlots = computed(() => {
  return Object.keys(omit(slots, 'default', 'leftFooter', 'rightFooter', 'headerContent'));
});

</script>

<style lang="less">
@namespace: 'vben';
@prefix-cls: ~'@{namespace}-page-wrapper';

.@{prefix-cls} {
  position: relative;

  .@{prefix-cls}-content {
    margin: 16px;
  }

  .ant-page-header {
    &:empty {
      padding: 0;
    }
  }

  &-content-bg {
    background-color: @component-background;
  }

  &--dense {
    .@{prefix-cls}-content {
      margin: 0;
    }
  }
}
</style>
