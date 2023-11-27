import { LAYOUT } from '../../basic'

const Editor: RouteRecordItem = {
  path: '/editor',
  name: 'Editor',
  component: LAYOUT,
  redirect: '/editor/monaco-editor',
  meta: {
    orderNo: 3,
    title: '编辑器',
    icon: 'line-md:document-code',
    root: true,
  },
  children: [
    {
      path: 'monaco-editor',
      name: 'monaco-editor',
      component: () => import('@/pages/demo/editor/monaco-editor.vue'),
      meta: {
        title: 'monaco-editor',
      },
    },
    {
      path: 'rich-text-editor',
      name: 'rich-text-editor',
      component: () => import('@/pages/demo/editor/rich-text-editor.vue'),
      meta: {
        title: '富文本编辑器',
      },
    },
  ],
}

export default Editor
