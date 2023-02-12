import { h, unref, VNode } from 'vue'
import { VbenIconify } from '@vben/vbencomponents'
import { useAppConfig } from '@vben/hooks'

export function renderIcon(icon: string): () => VNode {
  if (!icon) return () => undefined
  return () => h(VbenIconify, { icon })
}

export function renderIconNode(icon: string): () => VNode {
  return () => h(VbenIconify, { icon })
}

type MenuOption = {
  label: string
  key: string
  icon: () => VNode
  topMenu?: boolean
}
export function renderMenuIcon(menuOption: MenuOption): VNode {
  const { label, icon, topMenu } = menuOption
  if (!icon) return undefined
  const { getCollapsedShowLabel } = useAppConfig()
  if (unref(getCollapsedShowLabel) && topMenu) {
    return h(
      'div',
      {
        class: 'flex-center flex-col h-full w-full absolute',
        style: { left: '0' },
      },
      [
        icon(),
        h(
          'div',
          {
            class: 'truncate',
            style: 'font-size: 12px;max-width: 64px;margin-top:2px;',
          },
          label || '',
        ),
      ],
    )
  }
  return icon()
}
