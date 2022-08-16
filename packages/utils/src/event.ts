import { isClient } from './util'

const resizeHandler = (entries: ResizeObserverEntry[]) => {
  for (const entry of entries) {
    // @ts-ignore
    const listeners = entry.target.__resizeListeners__ || []
    if (listeners.length) {
      listeners.forEach((fn) => {
        fn()
      })
    }
  }
}

export const addResizeListener = (
  element,
  fn: (...args: unknown[]) => unknown,
) => {
  if (!isClient || !element) return
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = []
    element.__ro__ = new ResizeObserver(resizeHandler)
    element.__ro__.observe(element)
  }
  element.__resizeListeners__.push(fn)
}

export const removeResizeListener = (
  element,
  fn: (...args: unknown[]) => unknown,
) => {
  if (!element || !element.__resizeListeners__) return
  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1)
  if (!element.__resizeListeners__.length) {
    element.__ro__?.disconnect()
  }
}
