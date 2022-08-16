import '@vben/styles'
import 'ant-design-vue/dist/antd.variable.css'
import 'virtual:svg-icons-register'
import App from './app.vue'
import { createApp } from 'vue'
import { router } from '@/router'
import { setupRouteGuard } from '@/router/guard'
import { setupI18n } from '@vben/locale'
import { pinia } from './pinia'
import { initApplication } from './init-application'
import {
  Affix,
  Alert,
  // Anchor,
  // AutoComplete,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  // Button,
  // Calendar,
  Card,
  // Carousel,
  Cascader,
  Checkbox,
  Col,
  Collapse,
  // Comment,
  ConfigProvider,
  DatePicker,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  Empty,
  Form,
  Input,
  Image,
  // Layout,
  List,
  LocaleProvider,
  // Mentions,
  Menu,
  Modal,
  PageHeader,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  Radio,
  // Rate,
  Result,
  Row,
  Select,
  Skeleton,
  // Slider,
  Space,
  Spin,
  Statistic,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  TimePicker,
  // Timeline,
  Tooltip,
  Transfer,
  Tree,
  // Typography,
  Upload,
  Button,
} from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { initVbenComponent, locale } from '@vben/vbencomponents'
async function registerComponents(app) {
  initVbenComponent(app, {
    Tag: Tag,
    Card: Card,
    // Divider: NDivider,
    // Space: NSpace,
    Popover: Popover,
    // Button: NButton,
    // ButtonGroup: NButtonGroup,
    // Avatar: NAvatar,
    // Statistic: NStatistic,
    // Select: NSelect,
    // Input: NInput,
    // Thing: NThing,
    // Popconfirm: NPopconfirm,
    // Icon: NIcon,
    // Checkbox: NCheckbox,
    // CheckboxGroup: NCheckboxGroup,
    // Modal: NModal,
    // Empty: NEmpty,
    // Upload: NUpload,
    // UploadDragger: NUploadDragger,
    // Tabs: NTabs,
    // TabPane: NTabPane,
    // Grid: NGrid,
    // GridItem: NGridItem,
    // Ellipsis: NEllipsis,
    // Image: NImage,
    // MessageProvider: NMessageProvider,
    // Pagination: NPagination,
    // Radio: NRadio,
    // RadioButton: NRadioButton,
    // RadioGroup: NRadioGroup,
    // Text: NText,
    // Config: NConfigProvider,
    // DynamicTags: NDynamicTags,
    // ColorPicker: NColorPicker,
    // Descriptions: NDescriptions,
    // DescriptionsItem: NDescriptionsItem,
    // NotificationProvider: NNotificationProvider,
    // Switch: NSwitch,
  })
  locale.locale = zhCN
}

;(async () => {
  const app = createApp(App)

  app.use(pinia)

  await initApplication()
  // Register Global Components
  await registerComponents(app)
  console.log(app)
  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app)

  // Init Router
  app.use(router)
  setupRouteGuard(router)

  await router.isReady()

  app.mount('#app')

  // When Closing mock, Tree Shaking `mockjs` dep
  if (__VITE_USE_MOCK__) {
    import('../mock/_mock-server').then(({ setupProdMockServer }) =>
      setupProdMockServer(),
    )
  }
})()
