import type { ErrorMessageMode } from '@vben/types'
import { request } from '@vben/request'
import {UserInfo} from "@vben/types";

export interface RoleInfo {
  name: string
  value: string
}

export interface LoginParams {
  account: string
  password: string
}

export interface LoginResultModel {
  UserInfoModel
}

export interface UserInfoModel {
  id: number
  account: string
  realName?: string
  avatar: string
  desc?: string
}

export function doLoginApi(
  params: LoginParams,
  mode: ErrorMessageMode = 'modal',
) {
  return request.post<UserInfo>(
    {
      url: '/login',
      params,
    },
    {
      errorMessageMode: mode,
    },
  )
}

export function getUserInfoApi() {
  return request.get<UserInfoModel>(
    { url: '/getUserInfo' },
    { errorMessageMode: 'none' },
  )
}

export function getPermCode() {
  return request.get<string[]>({ url: '/getPermCode' })
}

export function doLogoutApi() {
  return request.get({ url: '/logout' })
}
