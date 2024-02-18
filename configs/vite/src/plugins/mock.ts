/**
 * Mock plugin for development and production.
 * @see https://github.com/condorheroblog/vite-plugin-fake-server
 */
import { vitePluginFakeServer } from 'vite-plugin-fake-server'

// 使用新的依赖库 vite-plugin-fake-server
// 注意事项：
// 1. mock文件夹下，所有的 *.mock.ts 文件，都会被加载
// 2. *.mock.ts 文件中 不能存在export default以外的export，抽离到别的ts即可，列如util
// 3. *.mock.ts 文件中 只能import相对路径，不可引入 '@vben/util/mock-util'

export function configMockPlugin(isBuild: boolean) {
  return vitePluginFakeServer({
    include: 'mock',
    infixName: 'mock',
    enableDev: !isBuild,
    enableProd: isBuild,
  })
}
