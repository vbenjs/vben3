import VbenIconify from './src/Iconify.vue'
import { h } from 'vue'

const renderIcon = (icon: string) => {
  if (!icon) return undefined
  return () => h(VbenIconify, { icon })
}
export { VbenIconify, renderIcon }
