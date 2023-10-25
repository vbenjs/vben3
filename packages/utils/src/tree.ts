interface TreeActionConfig {
  id: string
  children: string
  pid: string
}

const DEFAULT_CONFIG: TreeActionConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid',
}

function getConfig(config = {}) {
  return Object.assign({}, DEFAULT_CONFIG, config)
}

// tree from list
export function listToTree<T>(list: T[], config?: TreeActionConfig): T[] {
  const conf = getConfig(config)
  const nodeMap = new Map()
  const result: T[] = []
  const { id, children, pid } = conf

  for (const node of list) {
    node[children] = node[children] || []
    nodeMap.set(node[id], node)
  }
  for (const node of list) {
    const parent = nodeMap.get(node[pid])
    ;(parent ? parent[children] : result).push(node)
  }
  return result
}

export function treeToList<T = any>(tree: any, config?: TreeActionConfig): T {
  config = getConfig(config)
  const { children } = config
  const result: any = [...tree]
  for (let i = 0; i < result.length; i++) {
    if (!result[i][children!]) continue
    result.splice(i + 1, 0, ...result[i][children!])
  }
  return result
}

export function findTreeNode<T = any>(
  tree: any,
  func: AnyFunction<any>,
  config?: TreeActionConfig,
): T | null {
  config = getConfig(config)
  const { children } = config
  const list = [...tree]
  for (const node of list) {
    if (func(node)) return node
    node[children!] && list.push(...node[children!])
  }
  return null
}

export function findAllTreeNode<T = any>(
  tree: any,
  func: AnyFunction<any>,
  config?: TreeActionConfig,
): T[] {
  config = getConfig(config)
  const { children } = config
  const list = [...tree]
  const result: T[] = []
  for (const node of list) {
    func(node) && result.push(node)
    node[children!] && list.push(...node[children!])
  }
  return result
}

export function findParentPath<T = any>(
  tree: any,
  func: AnyFunction<any>,
  config?: TreeActionConfig,
): T | T[] | null {
  config = getConfig(config)
  const paths: T[] = []
  const list = [...tree]
  const visitedSet = new Set()
  const { children } = config
  while (list.length) {
    const node = list[0]
    if (visitedSet.has(node)) {
      paths.pop()
      list.shift()
    } else {
      visitedSet.add(node)
      node[children!] && list.unshift(...node[children!])
      paths.push(node)
      if (func(node)) {
        return paths
      }
    }
  }
  return null
}

export function findAllParentPath(
  tree: any,
  func: AnyFunction<any>,
  config?: TreeActionConfig,
) {
  config = getConfig(config)
  const paths: any[] = []
  const list = [...tree]
  const result: any[] = []
  const visitedSet = new Set(),
    { children } = config
  while (list.length) {
    const node = list[0]
    if (visitedSet.has(node)) {
      paths.pop()
      list.shift()
    } else {
      visitedSet.add(node)
      node[children!] && list.unshift(...node[children!])
      paths.push(node)
      func(node) && result.push([...paths])
    }
  }
  return result
}

export function findAllParentField(tree: any, path: string, field: string) {
  const list = findAllParentPath(tree, (n) => n[field] === path)
  return (list || []).map((item) => item[field])
}
//树结构筛选函数
export function filterTree<T = any>(
  tree: T[],
  func: (n: T) => boolean,
  config?: TreeActionConfig,
): T[] {
  config = getConfig(config)
  const children = config.children as string
  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node }))
      .filter((node) => {
        node[children] = node[children] && listFilter(node[children])
        return func(node) || (node[children] && node[children].length)
      })
  }
  return listFilter(tree)
}

export function forEachTree<T = any>(
  tree: T[],
  func: (n: T) => any,
  config?: TreeActionConfig,
) {
  config = getConfig(config)
  const list: any[] = [...tree]
  const { children } = config
  for (let i = 0; i < list.length; i++) {
    //func Returning true will terminate the traversal, avoiding meaningless loops in a large number of node scenarios, causing the browser to freeze
    if (func(list[i])) {
      return
    }
    children && list[i][children] && list.splice(i + 1, 0, ...list[i][children])
  }
}

/**
 * @description: Extract tree specified structure
 */
export function mapTree<T = any>(
  treeData: T[],
  opt: { children?: string; conversion: AnyFunction<any> },
): T[] {
  return treeData.map((item) => doMapTree(item, opt))
}

/**
 * Recursively traverse the tree structure
 */
export function traverseTree(
  data: any[],
  callBack: AnyFunction<any>,
  parentNode = {},
) {
  data.forEach((element) => {
    const newNode = callBack(element, parentNode) || element
    if (element.children) {
      traverseTree(element.children, callBack, newNode)
    }
  })
}

/**
 * @description: Extract tree specified structure
 */
function doMapTree(
  data: any,
  {
    children = 'children',
    conversion,
  }: { children?: string; conversion: AnyFunction<any> },
) {
  const haveChildren =
    Array.isArray(data[children]) && data[children].length > 0
  const conversionData = conversion(data) || {}
  if (haveChildren) {
    return {
      ...conversionData,
      [children]: data[children].map((i: number) =>
        doMapTree(i, {
          children,
          conversion,
        }),
      ),
    }
  } else {
    return { ...conversionData }
  }
}
