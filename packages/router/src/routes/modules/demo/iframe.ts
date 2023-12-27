import { LAYOUT } from '../../../routes'
const Iframe: RouteRecordItem = {
  path: '/iframe',
  name: 'iframe',
  component: LAYOUT,
  meta: {
    orderNo: 6,
    title: 'Iframe页面',
    icon: 'line-md:document-code',
    frame: {
      src: 'https://vbenjs.github.io/vben3-doc/',
      class: 'h-screen',
      width: '80%',
    },
  },
}

export default Iframe
