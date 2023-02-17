import { h, VNode } from 'vue'
import { VbenIconify } from '@vben/vbencomponents'

export function renderIcon(icon: string): () => VNode | undefined {
  if (!icon) return () => undefined
  return () => h(VbenIconify, { icon })
}
