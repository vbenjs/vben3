<script lang="ts" setup>
import {
  computed,
  CSSProperties,
  unref,
  ref,
  watchEffect,
  watch,
  PropType,
} from 'vue'
import CropperModal from './cropper-modal.vue'
import { useI18n } from '@vben/locale'
import Icon from '../icon/index.vue'

defineOptions({ name: 'CropperAvatar' })

const props = defineProps({
  width: { type: [String, Number], default: '200px' },
  value: { type: String },
  showBtn: { type: Boolean, default: true },
  btnProps: { type: Object },
  btnText: { type: String, default: '' },
  uploadApi: {
    type: Function as PropType<
      ({ file, name }: { file: Blob; name: string }) => Promise<void>
    >,
  },

  size: { type: Number, default: 5 },
})

const emit = defineEmits(['update:value', 'change'])

const sourceValue = ref(props.value || '')
const prefixCls = 'cropper-avatar'
const { t } = useI18n()
const cropperModelRef = ref()

const openModal = () => {
  unref(cropperModelRef).showModal = true
}

const closeModal = () => {
  unref(cropperModelRef).showModal = false
}

const getClass = computed(() => [prefixCls])

const getWidth = computed(() => `${props.width}`.replace(/px/, '') + 'px')

const getIconWidth = computed(
  () => parseInt(`${props.width}`.replace(/px/, '')) / 2 + 'px',
)

const getStyle = computed((): CSSProperties => ({ width: unref(getWidth) }))

const getImageWrapperStyle = computed(
  (): CSSProperties => ({ width: unref(getWidth), height: unref(getWidth) }),
)

watchEffect(() => {
  sourceValue.value = props.value || ''
})

watch(
  () => sourceValue.value,
  (v: string) => {
    emit('update:value', v)
  },
)

function handleUploadSuccess({ source, data }) {
  sourceValue.value = source
  emit('change', { source, data })
  console.log(t('component.cropper.uploadSuccess'))
}

defineExpose({ openModal, closeModal })
</script>

<template>
  <div :class="getClass" :style="getStyle">
    <div
      :class="`${prefixCls}-image-wrapper`"
      :style="getImageWrapperStyle"
      @click="openModal()"
    >
      <div :class="`${prefixCls}-image-mask`" :style="getImageWrapperStyle">
        <Icon
          icon="ant-design:cloud-upload-outlined"
          :size="getIconWidth"
          :style="getImageWrapperStyle"
          color="#d6d6d6"
        />
      </div>
      <img :src="sourceValue" v-if="sourceValue" alt="avatar" />
    </div>
    <vben-button
      :class="`${prefixCls}-upload-btn`"
      @click="openModal"
      v-if="showBtn"
      v-bind="btnProps"
    >
      {{ btnText ? btnText : t('component.cropper.selectImage') }}
    </vben-button>

    <CropperModal
      ref="cropperModelRef"
      @upload-success="handleUploadSuccess"
      :uploadApi="uploadApi"
      :src="sourceValue"
      :size="size"
      @close="closeModal"
    />
  </div>
</template>

<style lang="less" scoped>
@prefix-cls: ~'cropper-avatar';

.@{prefix-cls} {
  display: inline-block;
  text-align: center;

  &-image-wrapper {
    overflow: hidden;
    border: 1px solid hsv(0, 0, 85%);
    border-radius: 50%;
    background: #fff;
    cursor: pointer;

    img {
      width: 100%;
    }
  }

  &-image-mask {
    position: absolute;
    width: inherit;
    height: inherit;
    transition: opacity 0.4s;
    border: inherit;
    border-radius: inherit;
    opacity: 0;
    background: rgb(0 0 0 / 40%);
    cursor: pointer;

    ::v-deep(svg) {
      margin: auto;
    }
  }

  &-image-mask:hover {
    opacity: 40;
  }

  &-upload-btn {
    margin: 10px auto;
  }
}
</style>
