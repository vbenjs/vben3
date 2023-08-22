import { request } from '@vben/request'

export function getTableData() {
  return request.post({ url: '/demo/table' })
}

export function getTreeTableData() {
  return request.post({ url: '/demo/treeTable' })
}
