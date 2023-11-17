import { request } from '@vben/request'

export const getDeptTree = () => {
  return request.get({ url: '/demo/deptTreeList' })
}

export const getDeptUser = (params?: any) => {
  return request.post({ url: '/demo/deptUserList', params })
}

export const getRoleList = (params?: any) => {
  return request.post({ url: '/demo/roleList', params })
}
