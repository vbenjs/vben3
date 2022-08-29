/**
 * Vite Plugin for Enable https and http2
 * 用于启用 https 和 http2 的 Vite 插件
 * @see https://github.com/swandir/vite-plugin-http2-proxy
 * @see https://github.com/liuweiGL/vite-plugin-mkcert
 */

import Mkcert from 'vite-plugin-mkcert'
import Proxy from 'vite-plugin-http2-proxy'
import { PluginOption } from 'vite'

type ProxyItem = [string, string]
type ProxyList = ProxyItem[]

interface H2ProxyOptions {
  [regexp: string]: {
    target: string
    rewrite?: (url: string) => string
    headers?: Record<string, number | string | string[] | undefined>
    secure?: boolean
  }
}

/**
 * Generate proxy
 * @param list
 */
function createH2Proxy(list: ProxyList = []) {
  const ret: H2ProxyOptions = {}
  for (const [prefix, target] of list) {
    ret[`^${prefix}`] = {
      target,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
    }
  }
  return ret
}

export function configHttpsPlugin(env: ViteEnv) {
  const { VITE_USE_HTTPS, VITE_PROXY } = env

  const plugins: PluginOption[] = []

  if (VITE_USE_HTTPS) {
    plugins.push(Mkcert())
    plugins.push(Proxy(createH2Proxy(VITE_PROXY)))
  }
  return plugins
}
