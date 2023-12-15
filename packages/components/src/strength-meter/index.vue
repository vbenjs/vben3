<script lang="ts" setup>
defineOptions({ name: 'StrengthMeter' })
import { computed, ref, watch, unref, watchEffect } from 'vue'
import { zxcvbn } from '@zxcvbn-ts/core'
import { createNamespace } from '@vben/utils'

const { bem } = createNamespace('strength-meter')
const emit = defineEmits(['score-change', 'change'])

const props = defineProps({
  value: { type: String },
  showInput: {
    type: Boolean,
    default: true,
  },
  disabled: { type: Boolean },
})

const innerValueRef = ref('')

const getPasswordStrength = computed(() => {
  const { disabled } = props
  if (disabled) return -1
  const innerValue = unref(innerValueRef)
  const score = innerValue ? zxcvbn(unref(innerValueRef)).score : -1
  emit('score-change', score)
  return score
})

function handleChange(value: string) {
  emit('change', value)
  innerValueRef.value = value
}

watchEffect(() => {
  innerValueRef.value = props.value || ''
})

watch(
  () => unref(innerValueRef),
  (val) => {
    emit('change', val)
  },
)
</script>

<template>
  <div :class="bem()" class="relative">
    <VbenInput
      v-if="showInput"
      type="password"
      show-password-on="mousedown"
      v-bind="$attrs"
      clearable
      v-model:value="innerValueRef"
      @change="handleChange"
      :disabled="disabled"
    >
      <template #[item]="data" v-for="item in Object.keys($slots)">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </VbenInput>

    <div :class="`${bem()}-bar`">
      <div
        :class="`${bem()}-bar--fill`"
        :data-score="getPasswordStrength"
      ></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.strength-meter {
  &-bar {
    position: relative;
    height: 6px;
    margin: 10px auto 6px;
    border-radius: 6px;
    background-color: rgba(0, 0, 0, 0.04);

    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      z-index: 10;
      width: 20%;
      height: inherit;
      border-width: 0 5px;
      border-style: solid;
      border-color: #ffffff;
      background-color: transparent;
    }

    &::before {
      left: 20%;
    }

    &::after {
      right: 20%;
    }

    &--fill {
      position: absolute;
      width: 0;
      height: inherit;
      transition:
        width 0.5s ease-in-out,
        background 0.25s;
      border-radius: inherit;
      background-color: transparent;

      &[data-score='0'] {
        width: 20%;
        background-color: darken(#ed6f6f, 10%);
      }

      &[data-score='1'] {
        width: 40%;
        background-color: #ed6f6f;
      }

      &[data-score='2'] {
        width: 60%;
        background-color: #efbd47;
      }

      &[data-score='3'] {
        width: 80%;
        background-color: fade(#55d187, 50%);
      }

      &[data-score='4'] {
        width: 100%;
        background-color: #55d187;
      }
    }
  }
}
</style>
