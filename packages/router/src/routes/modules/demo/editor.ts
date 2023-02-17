import { LAYOUT } from '../../basic'

const Editor: RouteRecordItem = {
  path: '/editor',
  name: 'Editor',
  component: LAYOUT,
  redirect: '/editor/monaco-editor',
  meta: {
    orderNo: 3,
    title: '编辑器',
    icon: 'openmoji:code-editor',
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
  ],
}

export default Editor
