import { request } from '@vben/request'

export function getSelectData(params?) {
  return request.post(
    { url: '/demo/form/select', params },
    { joinParamsToUrl: true },
  )
}
