import { withInstall } from '../../index'

import Layout from './src/Layout.vue'
import LayoutHeader from './src/LayoutHeader.vue'
import LayoutSider from './src/LayoutSider.vue'
import LayoutFooter from './src/LayoutFooter.vue'
import LayoutContent from './src/LayoutContent.vue'

export const VbenLayout = withInstall(Layout)
export const VbenLayoutHeader = withInstall(LayoutHeader)
export const VbenLayoutSider = withInstall(LayoutSider)
export const VbenLayoutFooter = withInstall(LayoutFooter)
export const VbenLayoutContent = withInstall(LayoutContent)
