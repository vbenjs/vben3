<script lang="ts">
export default { name: 'LayoutFooter' }
</script>
<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { createNamespace } from '@vben/utils'
import { useSiteGeneral } from '@vben/hooks'

const { copyright, links } = useSiteGeneral()

const props = defineProps({
  height: {
    type: String,
    default: null,
  },
})
const { bem, cssVarBlock } = createNamespace('footer')
const style = computed(
  () =>
    (props.height
      ? cssVarBlock({ height: props.height })
      : {}) as CSSProperties,
)
</script>
<template>
  <footer :class="bem()" :style="style">
    <div class="flex items-center justify-center">
      <template v-for="(item, index) in links" :key="index">
        <VbenButton text tag="a" :href="item.url" target="_blank" class="mx-1">
          <span class="lh-32px flex items-center">
            <VbenIconify :icon="item.icon" size="18" />
            <VbenText depth="3">{{ item.label }}</VbenText>
          </span>
        </VbenButton>
      </template>
    </div>
    <VbenText depth="3">Copyright ©{{ copyright }}</VbenText>
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
