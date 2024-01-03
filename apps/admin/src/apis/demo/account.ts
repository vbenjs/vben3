import { request } from '@vben/request'

enum Api {
  SESSION_TIMEOUT = '/user/sessionTimeout',
  TOKEN_EXPIRED = '/user/tokenExpired',
}

export const sessionTimeoutApi = () =>
  request.post<void>({ url: Api.SESSION_TIMEOUT })

export const tokenExpiredApi = () =>
  request.post<void>({ url: Api.TOKEN_EXPIRED })
