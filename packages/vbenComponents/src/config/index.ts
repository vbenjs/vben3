import { withInstall } from '../../index'
import Config from './src/Config.vue'
export { theme, locale } from './src/data'

export const VbenConfig = withInstall(Config)
