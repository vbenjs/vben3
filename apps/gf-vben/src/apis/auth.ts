import type { ErrorMessageMode } from '@vben/types'
import { request } from '@vben/request'

export interface RoleInfo {
  name: string
  value: string
}

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResultModel {
  token: string
}

export interface UserInfoModel {
  roles: RoleInfo[]
  userId: string | number
  username: string
  realName?: string
  avatar: string
  desc?: string
}

export function doLoginApi(
  params: LoginParams,
  mode: ErrorMessageMode = 'modal',
) {
  return request.post<LoginResultModel>(
    {
      url: '/login',
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: '',
    },
  )
}

export function getUserInfoApi() {
  return request.get<UserInfoModel>(
    { url: '/user/info' },
    { errorMessageMode: 'none' },
  )
}

export function getPermCode() {
  return request.get<string[]>({ url: '/getPermCode' })
}

export function doLogoutApi() {
  return request.get({ url: '/logout' })
}
