import { request } from '@vben/request'

export const getDepartment = () => {
  return request.get({ url: '/demo/account/department' })
}
