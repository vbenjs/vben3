<script lang="ts">
export default {name: 'LayoutFooter'}
</script>
<script lang="ts" setup>
import {createNamespace, openWindow} from '@vben/utils'
import {context} from '../../bridge'
import { useI18n} from '@vben/locale'
import {useComosables} from "../useComosables";

const { t } = useI18n()
const { siteSetting } = context

const { DOC_URL, GITHUB_URL, SITE_URL } = siteSetting
const {contentRef, footerRef, contentRefHeight} = useComosables()

const {bem} = createNamespace('footer')
</script>
<template>
  <VbenAffix class="w-full"  :trigger-bottom="60" position="absolute" :listen-to="contentRef">
    {{ contentRefHeight }}
    <VbenLayoutFooter ref="footerRef">
      <footer :class="bem()">
        <div :class="bem('links')">
          <a @click="openWindow(SITE_URL)">{{ t('layout.footer.onlinePreview') }}</a>
          <VbenIconify @click="openWindow(GITHUB_URL)" :class="bem('github')" icon="ant-design:github-outlined" hover-pointer />
          <a @click="openWindow(DOC_URL)">{{ t('layout.footer.onlineDocument') }}</a>
        </div>
        <div :class="bem('trademark')">Copyright &copy;2020 Vben Admin</div>
      </footer>
    </VbenLayoutFooter>
  </VbenAffix>
</template>

<style lang="less" scoped>
@normal-color: rgba(0, 0, 0, 0.45);

@hover-color: rgba(0, 0, 0, 0.85);

.footer {
  --footer-padding: 0 20px;
  --footer-height: 60px;
  padding: var(--footer-padding);
  box-sizing: border-box;
  flex-shrink: 0;
  height: var(--footer-height);
  text-align: center;
  &__links {
    line-height: 32px;
    a {
      color: @normal-color;

      &:hover {
        cursor: pointer;
        color: @hover-color;
      }
    }
  }

  &__github {
    margin: 0 30px;
    color: @normal-color;

    &:hover {
      color: @hover-color;
    }
  }
  &__trademark {
    color: @normal-color;
  }
}
</style>
