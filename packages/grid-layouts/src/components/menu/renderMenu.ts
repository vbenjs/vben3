import { h, unref, VNode } from 'vue'
import { useAppConfig } from '@vben/hooks'
import { RouterLink } from 'vue-router'
import { renderIcon } from '../render'
import { useI18n } from '@vben/locale'

const { t } = useI18n()

type MenuOption = {
  collapseTitle: string
  key: string
  icon: () => VNode
  root?: boolean

  collapsedShowTitle?: boolean
}
export function renderMenuIcon(menuOption: MenuOption): VNode | undefined {
  const { collapseTitle, icon, root, collapsedShowTitle } = menuOption

  if (!icon) return undefined
  const { getCollapsedShowTitle } = useAppConfig()
  if (unref(getCollapsedShowTitle) && (root || collapsedShowTitle)) {
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
          collapseTitle || '',
        ),
      ],
    )
  }
  return icon()
}

export function renderMenuLabelToRouterLink(
  item: RouteRecordItem & { icon?: string },
) {
  const { path, children, meta, icon } = item

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
            path,
          },
        },
        { default: () => title },
      )
    },
    key: path,
    icon: renderIcon((icon || meta.icon) as unknown as string),
    collapseTitle: title,
    root: meta?.root || false,
    collapsedShowTitle: meta?.collapsedShowTitle || false,
  }
}

export function renderMenuLabel(
  item: RouteRecordItem & { icon?: string },
  attrs: Record<string, any>,
) {
  const { path, meta, icon } = item
  const title = t(meta.title as string)
  const { sidebar } = useAppConfig()
  const { onMouseenter, onClick } = attrs
  return {
    key: path,
    label: () => {
      return h(
        'div',
        {
          class: 'flex-center flex-col h-full w-full absolute',
          style: { left: '0', top: '0' },
          onMouseenter: () => {
            onMouseenter && onMouseenter(item)
          },
          onClick: () => {
            onClick && onClick(item)
          },
        },
        [
          renderIcon(icon)(),
          unref(sidebar).collapsed
            ? ''
            : h(
                'div',
                {
                  class: 'truncate',
                  style: 'font-size: 12px;max-width: 64px;margin-top:2px;',
                },
                title || '',
              ),
        ],
      )
    },
  }
}
