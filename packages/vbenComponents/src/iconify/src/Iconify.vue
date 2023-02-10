<script lang="ts">
export default {
  name: 'Iconify',
}
</script>
<script setup lang="ts" name="VbenIconify">
import type { PropType, CSSProperties } from 'vue'
import { unref, computed, useAttrs, ref, nextTick, watch, onMounted } from 'vue'
import { createNamespace, isString } from '@vben/utils'
import Iconify from '@purge-icons/generated'

const props = defineProps({
  color: { type: String },
  size: {
    type: [String, Number] as PropType<string | number>,
    default: 16,
  },
  infinite: { type: Boolean },
  icon: { type: String },
  prefix: { type: String, default: '' },
  hoverPointer: { type: Boolean },
  hoverColor: { type: String, default: 'inherit' },
})

const iconRefEl = ref<HTMLElement | null>(null)

const getIconRef = computed(
  () => `${props.prefix ? props.prefix + ':' : ''}${props.icon}`,
)

const { bem } = createNamespace('iconify')

const attrs = useAttrs()

const styles = computed((): CSSProperties => {
  const { size, color } = props
  let _size = size
  if (isString(size)) {
    _size = parseInt(size, 10)
  }

  return {
    fontSize: `${_size}px`,
    color: color,
    display: 'inline-flex',
  }
})

const classes = computed(() => {
  const cls = [bem(), unref(attrs).class]
  if (props.infinite) {
    cls.push(bem('infinite'))
  }
  return cls
})

const update = async () => {
  const el = unref(iconRefEl)
  if (!el) return

  await nextTick()
  const icon = unref(getIconRef)
  if (!icon) return

  const svg = Iconify.renderSVG(icon, {})
  if (svg) {
    el.textContent = ''
    el.appendChild(svg)
  } else {
    const span = document.createElement('span')
    span.className = 'iconify'
    span.dataset.icon = icon
    el.textContent = ''
    el.appendChild(span)
  }
}

watch(() => props.icon, update, { flush: 'post' })

onMounted(update)
</script>

<template>
  <span :class="[classes,{'hover:cursor-pointer': hoverPointer}]" :style="styles" ref="iconRefEl"></span>
</template>

<style lang="less" scoped>
.iconify {
  display: inline-block;
  transition: color 0.3s, transform .3s;
  &:hover{
    color: v-bind(hoverColor) !important;
  }
}

.iconify__infinite {
  animation: loading-circle 1s infinite linear;
}

</style>
