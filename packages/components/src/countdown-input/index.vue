<script lang="ts" setup>
import type { PropType } from 'vue'
import type { ButtonSize } from '@vben/types'
import { useAttrs, computed } from 'vue'
import { createNamespace } from '@vben/utils'
import CountButton from './countdown-button.vue'

const { bem } = createNamespace('count-down-input')
const attrs = useAttrs()
const emit = defineEmits(['change'])

const props = defineProps({
  value: { type: String },
  size: {
    type: String as PropType<ButtonSize>,
    validator: (v: string) => ['default', 'large', 'small'].includes(v),
  },
  count: { type: Number, default: 60 },
  sendCodeApi: {
    type: Function as PropType<() => Promise<boolean>>,
    default: null,
  },
})

const state = computed<string>({
  get() {
    return props.value
  },
  set(value) {
    emit?.('change', value)
  },
})

const slotKeys = computed(() => {
  return Object.keys(attrs).filter((k) => k !== 'addonAfter')
})
</script>

<template>
  <vben-input v-bind="attrs" :class="bem()" :size="size" :value="state">
    <template #suffix> <!--NaiveUI的后缀slot写法不是addonAfter是suffx-->
      <CountButton
        :size="size"
        :count="count"
        :value="state"
        :beforeStartFunc="sendCodeApi"
      />
    </template>
    <template #[item]="data" v-for="item in slotKeys">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </vben-input>
</template>

<style lang="less">
.count-down-input {
  .n-input-wrapper{
    padding-right:0px; //NaiveUI有Count-down按钮时不需要右边距
  }
  .ant-input-group-addon {
    padding-right: 0;
    background-color: transparent;
    border: none;

    button {
      font-size: 14px;
    }
  }
}
</style>
