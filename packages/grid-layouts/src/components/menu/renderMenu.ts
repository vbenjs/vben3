import { h, unref, VNode } from 'vue'
import { useAppConfig } from '@vben/hooks'
import { RouterLink } from 'vue-router'
import { renderIcon } from '../render'
import { useI18n } from '@vben/locale'

const { t } = useI18n()

type MenuOption = {
  iconTitle: string
  key: string
  icon: () => VNode
  root?: boolean
}
export function renderMenuIcon(menuOption: MenuOption): VNode | undefined {
  const { iconTitle, icon, root } = menuOption

  if (!icon) return undefined
  const { getCollapsedShowTitle } = useAppConfig()
  if (unref(getCollapsedShowTitle) && root) {
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
          iconTitle || '',
        ),
      ],
    )
  }
  return icon()
}

export function renderMenuLabelToRouterLink(
  item: RouteRecordItem & { icon?: string },
) {
  const { name, children, meta, icon } = item

  const title = t(meta.title as string)
  return {
    label: () => {
      if (children) {
        return title
      }
      return h(
        RouterLink,
        {
          to: {
            name,
          },
        },
        { default: () => title },
      )
    },
    key: name,
    icon: renderIcon((icon || meta.icon) as unknown as string),
    iconTitle: title,
    root: meta?.root || false,
  }
}
