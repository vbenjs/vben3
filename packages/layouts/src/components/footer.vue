<script lang="ts">
export default {name: 'LayoutFooter'}
</script>
<script lang="ts" setup>
import type {CSSProperties} from 'vue'
import {computed} from 'vue'
import {createNamespace, openWindow} from '@vben/utils'
import {context} from '../../bridge'
import { useI18n} from '@vben/locale'

const { t } = useI18n()
const { siteSetting } = context

const { DOC_URL, GITHUB_URL, SITE_URL } = siteSetting

const props = defineProps({
  height: {
    type: String,
    default: null,
  },
})
const {bem, cssVarBlock} = createNamespace('footer')
const style = computed(
  () =>
    (props.height
      ? cssVarBlock({height: props.height})
      : {}) as CSSProperties,
)
</script>
<template>
  <footer :class="bem()" :style="style">
    <div class="lh-32px">
      <VbenButton
        text
        tag="a"
        :href="SITE_URL"
        target="_blank"
        type="info"
      >
        {{ t('layout.footer.onlinePreview') }}
      </VbenButton>

      <VbenButton
        text
        tag="a"
        :href="GITHUB_URL"
        target="_blank"
        type="info"
        class="mx-10"
      >
        <VbenIconify @click="openWindow(GITHUB_URL)" icon="ant-design:github-outlined" />
      </VbenButton>

      <VbenButton
        text
        tag="a"
        :href="DOC_URL"
        target="_blank"
        type="info"
      >
        {{ t('layout.footer.onlineDocument') }}
      </VbenButton>
    </div>
    <VbenGradientText type="info">Copyright &copy;2023 Vben Admin V3</VbenGradientText>
  </footer>
</template>

<style lang="less" scoped>
.footer {
  --footer-padding: 0 20px;
  --footer-height: 60px;
  padding: var(--footer-padding);
  box-sizing: border-box;
  flex-shrink: 0;
  height: var(--footer-height);
  text-align: center;
}
</style>
