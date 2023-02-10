export function toggleClass(
  flag: boolean,
  clsName: string,
  target?: HTMLElement,
) {
  const targetEl = target || document.body
  let { className } = targetEl
  className = className.replace(clsName, '')
  targetEl.className = (flag ? `${className} ${clsName} ` : className).trim()
}

export function setCssVar(
  prop: string,
  val: any,
  dom = document.documentElement,
) {
  dom.style.setProperty(prop, val)
}
