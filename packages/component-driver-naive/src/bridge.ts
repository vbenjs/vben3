import {
  ComponentDriverBuilder,
  VbenComponentDriver,
  ComponentInstaller,
  toBuilder,
} from '@vben/component-driver';

import { App } from 'vue';
import { install } from './installer';

export class NavieuiComponentDriver extends VbenComponentDriver {
  constructor(app?: App) {
    super(app);
  }
  static builder(app?: App): ComponentDriverBuilder {
    const bridgeBuilder = {} as ComponentDriverBuilder;
    const bridge = new NavieuiComponentDriver(app);
    const installer = new ComponentInstaller(install, bridgeBuilder, app);
    return toBuilder(installer, bridgeBuilder, bridge);
  }
}
