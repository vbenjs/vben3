import { App, Component } from 'vue'
import {
  ComponentEntry,
  VbenComponent,
  VbenComponentDetailDict,
} from './installer'

/**
 * 组件驱动器
 */
export class VbenComponentDriver {
  app?: App
  componentMap: Map<VbenComponent, Component>
  constructor(app?: App) {
    this.app = app
    this.componentMap = new Map<VbenComponent, Component>()
  }

  getApp(): App | undefined {
    return this.app
  }

  getComponent(name: VbenComponent): Component | undefined {
    return this.componentMap.get(name)
  }

  componentDictoray(): VbenComponentDetailDict {
    const dict: VbenComponentDetailDict = {}
    this.componentMap.forEach((value, key) => {
      dict[key] = value
    })
    return dict
  }

  /**
   * 注册组件
   * @param entry 组件属性元组
   * @returns {CornerstoneComponentBuilder}
   */
  registerComponent(entry: ComponentEntry): VbenComponentDriver {
    this.componentMap.set(entry.key, entry.value)
    return this
  }
}

/**
 * Builder定义
 */
export class ComponentInstaller {
  constructor(
    installer: (
      rockComponent: VbenComponent,
      app?: App,
    ) => ComponentEntry | undefined,
    builder: ComponentDriverBuilder,
    app?: App,
  ) {
    for (const name in VbenComponent) {
      const componentEnum = VbenComponent[name]
      this[`enable${componentEnum}`] = () => {
        const entry = installer(componentEnum, app)
        if (entry) {
          builder.componentBridge().registerComponent(entry)
        }
        return builder
      }
    }
  }
  [key: string]: (app?: App) => ComponentDriverBuilder
}

/**
 * Builder尾部
 */
export interface BuilderTail {
  componentBridge(): VbenComponentDriver

  enableAll(): VbenComponentDriver

  finish(): VbenComponentDriver
}

/**
 * 组件驱动器构建器
 */
export type ComponentDriverBuilder = ComponentInstaller & BuilderTail

/**
 * 创建Builder
 * @param installer 组件安装器
 * @param bridgeBuilder
 * @param bridge
 * @returns {ComponentDriverBuilder}
 */
export const toBuilder = (
  installer: ComponentInstaller,
  driverBuilder: ComponentDriverBuilder,
  driver: VbenComponentDriver,
) => {
  Object.assign(driverBuilder, installer)
  driverBuilder.componentBridge = () => driver
  driverBuilder.enableAll = () => {
    for (const name in VbenComponent) {
      installer[`enable${VbenComponent[name]}`]()
    }
    return driverBuilder.finish()
  }
  driverBuilder.finish = () => driver
  return driverBuilder
}
