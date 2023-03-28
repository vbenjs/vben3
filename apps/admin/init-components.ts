// 按需导入组件
import { useMessage } from 'naive-ui/es/message/src/use-message';
import { useNotification } from 'naive-ui/es/notification/src/use-notification';
import { initVbenComponent, setNotice, setMessage } from '@vben/vbencomponents'
import { NavieuiComponentDriver as ComponentDriver } from '@vben/component-driver-navie'

export async function registerComponents(app) {
  const driver: ComponentDriver = ComponentDriver.builder().enableAll();
  // const driver1: ComponentDriver =ComponentDriver.builder().enableDrawer().enaableDrawerContent().finish();
  initVbenComponent(app, driver.componentDictoray())
  // TODO 解耦两个use
  setMessage(useMessage)
  setNotice(useNotification)
  // @ts-ignore
  // app.use(naive)
}
