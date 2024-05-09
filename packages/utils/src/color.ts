import { generate } from '@ant-design/colors'
import { clamp } from './util'
function rgb(str: string) {
  const abbr = /^#([a-f0-9]{3,4})$/i
  const hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i
  const rgba =
    /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/
  const per =
    /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/

  const rgb = [0, 0, 0, 1]
  let match: string | string[] | null
  let i: number
  let hexAlpha: string

  if ((match = str.match(hex))) {
    hexAlpha = match[2]
    match = match[1]

    for (i = 0; i < 3; i++) {
      // https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
      const i2 = i * 2
      rgb[i] = parseInt(match.slice(i2, i2 + 2), 16)
    }

    if (hexAlpha) {
      rgb[3] = parseInt(hexAlpha, 16) / 255
    }
  } else if ((match = str.match(abbr))) {
    match = match[1]
    hexAlpha = match[3]

    for (i = 0; i < 3; i++) {
      rgb[i] = parseInt(match[i] + match[i], 16)
    }

    if (hexAlpha) {
      rgb[3] = parseInt(hexAlpha + hexAlpha, 16) / 255
    }
  } else if ((match = str.match(rgba))) {
    for (i = 0; i < 3; i++) {
      rgb[i] = parseInt(match[i + 1], 0)
    }

    if (match[4]) {
      if (match[5]) {
        rgb[3] = parseFloat(match[4]) * 0.01
      } else {
        rgb[3] = parseFloat(match[4])
      }
    }
  } else if ((match = str.match(per))) {
    for (i = 0; i < 3; i++) {
      rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55)
    }

    if (match[4]) {
      if (match[5]) {
        rgb[3] = parseFloat(match[4]) * 0.01
      } else {
        rgb[3] = parseFloat(match[4])
      }
    }
  } else {
    return null
  }

  for (i = 0; i < 3; i++) {
    rgb[i] = clamp(rgb[i], 0, 255)
  }
  rgb[3] = clamp(rgb[3], 0, 1)

  return rgb
}

/**
 * 判断是否 十六进制颜色值.
 * 输入形式可为 #fff000 #f00
 *
 * @param   String  color   十六进制颜色值
 * @return  Boolean
 */
export function isHexColor(color: string) {
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-f]{6})$/
  return reg.test(color)
}

/**
 * RGB 颜色值转换为 十六进制颜色值.
 * r, g, 和 b 需要在 [0, 255] 范围内
 *
 * @return  String          类似#ff00ff
 * @param r
 * @param g
 * @param b
 */
export function rgbToHex(r: number, g: number, b: number) {
  // tslint:disable-next-line:no-bitwise
  const hex = ((r << 16) | (g << 8) | b).toString(16)
  return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex
}

/**
 * Transform a HEX color to its RGB representation
 * @param {string} hex The color to transform
 * @returns The RGB representation of the passed color
 */
export function hexToRGB(hex: string) {
  let sHex = hex.toLowerCase()
  if (isHexColor(hex)) {
    if (sHex.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sHex.slice(i, i + 1).concat(sHex.slice(i, i + 1))
      }
      sHex = sColorNew
    }
    const sColorChange: number[] = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sHex.slice(i, i + 2)))
    }
    return 'RGB(' + sColorChange.join(',') + ')'
  }
  return sHex
}

export function colorIsDark(color: string) {
  if (!isHexColor(color)) return
  const [r, g, b] = hexToRGB(color)
    .replace(/(?:\(|\)|rgb|RGB)*/g, '')
    .split(',')
    .map((item) => Number(item))
  return r * 0.299 + g * 0.578 + b * 0.114 < 192
}

/**
 * Darkens a HEX color given the passed percentage
 * @param {string} color The color to process
 * @param {number} amount The amount to change the color by
 * @returns {string} The HEX representation of the processed color
 */
export function darken(color: string, amount: number) {
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
  amount = Math.trunc((255 * amount) / 100)
  return `#${subtractLight(color.substring(0, 2), amount)}${subtractLight(
    color.substring(2, 4),
    amount,
  )}${subtractLight(color.substring(4, 6), amount)}`
}

/**
 * Lightens a 6 char HEX color according to the passed percentage
 * @param {string} color The color to change
 * @param {number} amount The amount to change the color by
 * @returns {string} The processed color represented as HEX
 */
export function lighten(color: string, amount: number) {
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
  amount = Math.trunc((255 * amount) / 100)
  return `#${addLight(color.substring(0, 2), amount)}${addLight(
    color.substring(2, 4),
    amount,
  )}${addLight(color.substring(4, 6), amount)}`
}

/* Suma el porcentaje indicado a un color (RR, GG o BB) hexadecimal para aclararlo */
/**
 * Sums the passed percentage to the R, G or B of a HEX color
 * @param {string} color The color to change
 * @param {number} amount The amount to change the color by
 * @returns {string} The processed part of the color
 */
function addLight(color: string, amount: number) {
  const cc = parseInt(color, 16) + amount
  const c = cc > 255 ? 255 : cc
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}

/**
 * Calculates luminance of an rgb color
 * @param {number} r red
 * @param {number} g green
 * @param {number} b blue
 */
function luminanace(r: number, g: number, b: number) {
  const a = [r, g, b].map((v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

/**
 * Calculates contrast between two rgb colors
 * @param {string} rgb1 rgb color 1
 * @param {string} rgb2 rgb color 2
 */
function contrast(rgb1: string[], rgb2: number[]) {
  return (
    (luminanace(~~rgb1[0], ~~rgb1[1], ~~rgb1[2]) + 0.05) /
    (luminanace(rgb2[0], rgb2[1], rgb2[2]) + 0.05)
  )
}

/**
 * Determines what the best text color is (black or white) based con the contrast with the background
 * @param hexColor - Last selected color by the user
 */
export function calculateBestTextColor(hexColor: string) {
  const rgbColor = hexToRGB(hexColor.substring(1))
  const contrastWithBlack = contrast(rgbColor.split(','), [0, 0, 0])

  return contrastWithBlack >= 12 ? '#000000' : '#FFFFFF'
}

/**
 * Subtracts the indicated percentage to the R, G or B of a HEX color
 * @param {string} color The color to change
 * @param {number} amount The amount to change the color by
 * @returns {string} The processed part of the color
 */
function subtractLight(color: string, amount: number) {
  const cc = parseInt(color, 16) - amount
  const c = cc < 0 ? 0 : cc
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}

/**
 * Pick text color based on background color
 * @param bgColor {string}
 * @param lightColor {string}
 * @param darkColor {string}
 * @returns {string} text color
 */
export function pickTextColorBasedOnBgColor(
  bgColor: string,
  lightColor: string,
  darkColor: string,
) {
  const [r, g, b] = rgb(bgColor)!
  console.log(r, g, b)

  const uicolors = [r / 255, g / 255, b / 255]
  const c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92
    }
    return Math.pow((col + 0.055) / 1.055, 2.4)
  })
  const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
  return L < 0.8 ? darkColor : lightColor
}

interface GenerateColorsOptions {
  theme?: 'dark' | 'default'
  backgroundColor?: string
}

type GeneratedColors = [
  string, //最浅色
  string,
  string,
  string,
  string,
  string, //基本色
  string,
  string,
  string,
  string, //最深色
]
export function generateColors(
  color: string,
  opts: GenerateColorsOptions = { theme: 'default' },
) {
  return generate(color, {
    ...opts,
  }) as GeneratedColors
}
