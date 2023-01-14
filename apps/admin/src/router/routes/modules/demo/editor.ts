import { LAYOUT } from '@/router/routes'

const Editor: RouteRecordItem = {
  path: '/editor',
  name: 'Editor',
  component: LAYOUT,
  meta: {
    orderNo: 3,
    title: '编辑器',
    icon: 'openmoji:code-editor'
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
  ],
}

export default Editor
