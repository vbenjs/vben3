import { h } from 'vue'
import { VbenIconify } from '@vben/vbencomponents'

export function renderIcon(icon: string) {
  if (!icon) return undefined
  return () => h(VbenIconify, { icon })
}

export function renderMenuIcon(icon: string, label?: string) {
  if (!icon) return undefined
  return renderIcon(icon)
}
