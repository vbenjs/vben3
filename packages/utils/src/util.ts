import { isObject } from 'lodash-es'

// @ts-ignore
function NOOP() {}

function openWindow(
  url: string,
  opt?: {
    target?: '_self' | '_blank' | string
    noopener?: boolean
    noreferrer?: boolean
  },
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  const feature: string[] = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')

  window.open(url, target, feature.join(','))
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  appendUrlParams('www.google.com', obj)
 *  ==>www.google.com?a=3&b=4
 */
function appendUrlParams(baseUrl: string, obj: any): string {
  let parameters = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl)
    ? baseUrl + parameters
    : baseUrl.replace(/\/?$/, '?') + parameters
}

function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] =
      isObject(src[key]) && src[key] !== null
        ? deepMerge(src[key], target[key])
        : (src[key] = target[key])
  }
  return src
}

function isUrl(path: string): boolean {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}
/**
 * 将给定的数值限制在指定的最小值和最大值之间。
 * @param num 需要限制的数值。
 * @param min 允许的最小值。
 * @param max 允许的最大值。
 * @returns 返回经过限制后的数值，确保它不会小于最小值或大于最大值。
 */
export function clamp(num: number, min: number, max: number) {
  // 使用Math.min和Math.max函数确保num值位于min和max之间
  return Math.min(Math.max(num, min), max)
}
export { isUrl, deepMerge, appendUrlParams, openWindow, NOOP }
