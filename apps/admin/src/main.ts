import '@vben/styles'
// import 'ant-design-vue/dist/antd.variable.css'
import 'virtual:svg-icons-register'
import App from './app.vue'
import { createApp } from 'vue'
import { router } from '@/router'
import { setupRouteGuard } from '@/router/guard'
import { setupI18n } from '@vben/locale'
import { pinia } from './pinia'
import { initApplication } from './init-application'
import { registerComponents } from '../init-components'
// import {
//   Affix,
//   Alert,
//   // Anchor,
//   // AutoComplete,
//   Avatar,
//   BackTop,
//   Badge,
//   Breadcrumb,
//   // Button,
//   // Calendar,
//   Card,

//   // Carousel,
//   Cascader,
//   Checkbox,
//   Col,
//   Collapse,
//   // Comment,
//   ConfigProvider,
//   DatePicker,
//   Descriptions,
//   Divider,
//   Drawer,
//   Dropdown,
//   Empty,
//   Form,
//   Input,
//   Image,
//   // Layout,
//   List,
//   LocaleProvider,
//   // Mentions,
//   Menu,
//   Modal,
//   PageHeader,
//   Pagination,
//   Popconfirm,
//   Popover,
//   Progress,
//   Radio,
//   // Rate,
//   Result,
//   Row,
//   Select,
//   Skeleton,
//   // Slider,
//   Space,
//   Spin,
//   Statistic,
//   Steps,
//   Switch,
//   Table,
//   Tabs,
//   Tag,
//   TimePicker,
//   // Timeline,
//   Tooltip,
//   Transfer,
//   Tree,
//   // Typography,
//   Upload,
//   Button,
// } from 'ant-design-vue'
;(async () => {
  const app = createApp(App)

  app.use(pinia)
  await registerComponents(app)
  await initApplication()
  // Register Global Components

  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app)
  // Init Router
  app.use(router)
  await setupRouteGuard(router)
  await router.isReady()

  app.mount('#app')

  // When Closing mock, Tree Shaking `mockjs` dep
  if (__VITE_USE_MOCK__) {
    import('../mock/_mock-server').then(({ setupProdMockServer }) =>
      setupProdMockServer(),
    )
  }
})()
