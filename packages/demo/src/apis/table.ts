import { request } from '@vben/request'

export function getTableData() {
  return request.post({ url: '/demo/table' })
}
export function getUseTableData(params?: any) {
  return request.post({ url: '/demo/useTable', params })
}

export function getTreeTableData() {
  return request.post({ url: '/demo/treeTable' })
}

export function getOperatorData() {
  return request.post({ url: '/demo/operator' })
}
