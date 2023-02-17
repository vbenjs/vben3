import { ref, unref, Ref, nextTick, onMounted } from 'vue'
import {
  cloneDeep,
  filterTree,
  forEachTree,
  useDebounceFn,
  onKeyStroke,
} from '@vben/utils'
import { useI18n } from '@vben/locale'
import { useGo, useScrollTo } from '@vben/hooks'
import { context } from '../../../bridge'

export interface SearchResult {
  name: string
  path: string
  icon?: string
}

// interface ChangeEvent extends Event {
//   target: HTMLInputElement
// }

// Translate special characters
function transform(c: string) {
  const code: string[] = [
    '$',
    '(',
    ')',
    '*',
    '+',
    '.',
    '[',
    ']',
    '?',
    '\\',
    '^',
    '{',
    '}',
    '|',
  ]
  return code.includes(c) ? `\\${c}` : c
}

function createSearchReg(key: string) {
  const keys = [...key].map((item) => transform(item))
  const str = ['', ...keys, ''].join('.*')
  return new RegExp(str)
}

export function useMenuSearch(
  refs: Ref<HTMLElement[]>,
  scrollWrap: Ref<ElRef>,
  emit: any,
) {
  const searchResult = ref<SearchResult[]>([])
  const keyword = ref('')
  const activeIndex = ref(-1)

  let menuList: Array<any> = []

  const { t } = useI18n()
  const go = useGo()
  const handleSearch = useDebounceFn(search, 200)

  onMounted(async () => {
    const list = await context.getMenus()

    menuList = cloneDeep(list)
    forEachTree(menuList, (item) => {
      item.name = t(item.name)
    })
  })

  function search(e: string) {
    const key = e
    keyword.value = key.trim()
    if (!key) {
      searchResult.value = []
      return
    }
    const reg = createSearchReg(unref(keyword))
    const filterMenu = filterTree(menuList, (item) => {
      return reg.test(t(item.title)) && !item.hideMenu
    })
    searchResult.value = handlerSearchResult(filterMenu, reg)
    activeIndex.value = 0
  }

  function handlerSearchResult(filterMenu: any[], reg: RegExp, parent?: any) {
    const ret: SearchResult[] = []
    filterMenu.forEach((item) => {
      const { name, path, icon, children, hideMenu, meta } = item
      if (
        !hideMenu &&
        reg.test(name) &&
        (!children?.length || meta?.hideChildrenInMenu)
      ) {
        ret.push({
          name: parent?.name ? `${parent.name} > ${name}` : name,
          path,
          icon,
        })
      }
      if (
        !meta?.hideChildrenInMenu &&
        Array.isArray(children) &&
        children.length
      ) {
        ret.push(...handlerSearchResult(children, reg, item))
      }
    })
    return ret
  }

  // Activate when the mouse moves to a certain line
  function handleMouseenter(e: any) {
    const index = e.target.dataset.index
    activeIndex.value = Number(index)
  }

  // Arrow key up
  function handleUp() {
    if (!searchResult.value.length) return
    activeIndex.value--
    if (activeIndex.value < 0) {
      activeIndex.value = searchResult.value.length - 1
    }
    handleScroll()
  }

  // Arrow key down
  function handleDown() {
    if (!searchResult.value.length) return
    activeIndex.value++
    if (activeIndex.value > searchResult.value.length - 1) {
      activeIndex.value = 0
    }
    handleScroll()
  }

  // When the keyboard up and down keys move to an invisible place
  // the scroll bar needs to scroll automatically
  function handleScroll() {
    const refList = unref(refs)
    if (
      !refList ||
      !Array.isArray(refList) ||
      refList.length === 0 ||
      !unref(scrollWrap)
    ) {
      return
    }

    const index = unref(activeIndex)
    const currentRef = refList[index]
    if (!currentRef) {
      return
    }
    const wrapEl = unref(scrollWrap)
    if (!wrapEl) {
      return
    }
    const scrollHeight = currentRef.offsetTop + currentRef.offsetHeight
    const wrapHeight = wrapEl.offsetHeight
    const { start } = useScrollTo({
      el: wrapEl,
      duration: 100,
      to: scrollHeight - wrapHeight,
    })
    start()
  }

  // enter keyboard event
  async function handleEnter() {
    if (!searchResult.value.length) {
      return
    }
    const result = unref(searchResult)
    const index = unref(activeIndex)
    if (result.length === 0 || index < 0) {
      return
    }
    const to = result[index]
    handleClose()
    await nextTick()
    go(to.path)
  }

  // close search modal
  function handleClose() {
    searchResult.value = []
    emit('close')
  }

  // enter search
  onKeyStroke('Enter', handleEnter)
  // Monitor keyboard arrow keys
  onKeyStroke('ArrowUp', handleUp)
  onKeyStroke('ArrowDown', handleDown)
  // esc close
  onKeyStroke('Escape', handleClose)

  return {
    handleSearch,
    searchResult,
    keyword,
    activeIndex,
    handleMouseenter,
    handleEnter,
  }
}
