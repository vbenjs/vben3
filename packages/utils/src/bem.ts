type Mod = string | { [key: string]: any }
type Mods = Mod | Mod[]

export type BEM = ReturnType<typeof createBEM>

function generatorBEM(name: string, mods?: Mods): string {
  if (!mods) {
    return ''
  }

  if (typeof mods === 'string') {
    return ` ${mods}`
  }

  if (Array.isArray(mods)) {
    return mods.reduce((ret, item) => ret + generatorBEM(name, item), '')
  }

  return Object.keys(mods).reduce(
    (ret, key) => ret + (mods[key] ? generatorBEM(name, key) : ''),
    '',
  )
}

/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */
function buildBEM(name: string) {
  return (el?: Mods, mods?: Mods): Mods => {
    if (el && typeof el !== 'string') {
      mods = el
      el = ''
    }

    el = el ? `${name}__${el}` : name

    return `${el}${generatorBEM(el, mods)}`
  }
}

export function createBEM(name: string) {
  return { bem: buildBEM(`${name}`) }
}

export function createNamespace(name: string) {
  const prefixedName = `${name}`

  const cssVarBlock = (record: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in record) {
      styles[`--${name}-${key}`] = record[key]
    }
    return styles
  }
  return {
    prefixedName,
    bem: buildBEM(prefixedName),
    cssVarBlock,
  }
}
