/*
 * @Author       : ya2glu@163.com
 * @Date         : 2023-12-26 15:43:19
 * @LastEditTime : 2023-12-26 15:43:29
 * @LastEditors  : ya2glu
 * @Description  : 请输入描述信息
 * @FilePath     : \vben3\packages\demo\src\apis\menu.ts
 */
import { request } from '@vben/request'

export interface RouteItem {
  path: string
  component: any
  meta: any
  name?: string
  alias?: string | string[]
  redirect?: string
  caseSensitive?: boolean
  children?: RouteItem[]
}

/**
 * @description: Get menu return value
 */
export type GetMenuListResultModel = RouteItem[]

enum Api {
  GetMenuList = '/getMenuList',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return request.get<GetMenuListResultModel>({ url: Api.GetMenuList })
}
