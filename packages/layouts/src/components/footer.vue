<script lang="ts">
export default {name: 'LayoutFooter'}
</script>
<script lang="ts" setup>
import type {CSSProperties} from 'vue'
import {computed} from 'vue'
import {createNamespace} from '@vben/utils'
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
      >
        <VbenText depth="3">{{ t('layout.footer.onlinePreview') }}</VbenText>
      </VbenButton>

      <VbenButton
        text
        tag="a"
        :href="GITHUB_URL"
        target="_blank"
        class="mx-10"
      >
        <VbenText depth="3">
          <VbenIconify icon="ant-design:github-outlined" />
        </VbenText>
      </VbenButton>

      <VbenButton
        text
        tag="a"
        :href="DOC_URL"
        target="_blank"
      >
        <VbenText depth="3" style="">{{ t('layout.footer.onlineDocument') }}</VbenText>
      </VbenButton>
    </div>
    <VbenText depth="3">Copyright &copy;2023 Vben Admin</VbenText>
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
