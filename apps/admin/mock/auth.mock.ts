import {
  resultError,
  resultSuccess,
  getRequestToken,
  createFakeUserList,
} from './util'
import { defineFakeRoute } from 'vite-plugin-fake-server/client'

const fakeCodeList: any = {
  '1': ['1000', '3000', '5000'],

  '2': ['2000', '4000', '6000'],
}

export default defineFakeRoute([
  // mock user login
  {
    url: '/basic-api/login',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      const checkUser = createFakeUserList().find(
        (item) => item.username === username && password === item.password,
      )
      //
      if (!checkUser) {
        return resultError('Incorrect account or password！')
      }
      return resultSuccess(checkUser)
    },
  },
  {
    url: '/basic-api/getUserInfo',
    method: 'get',
    response: (request) => {
      const accessToken = getRequestToken(request)

      if (!accessToken) return resultError('Invalid accessToken.')
      const checkUser = createFakeUserList().find(
        (item) => item.accessToken === accessToken,
      )
      if (!checkUser) {
        return resultError(
          'The corresponding user information was not obtained!',
        )
      }
      return resultSuccess(checkUser)
    },
  },
  {
    url: '/basic-api/getPermCode',
    timeout: 200,
    method: 'get',
    response: (request) => {
      const accessToken = getRequestToken(request)
      if (!accessToken) return resultError('Invalid accessToken.')
      const checkUser = createFakeUserList().find(
        (item) => item.accessToken === accessToken,
      )
      if (!checkUser) {
        return resultError('Invalid accessToken.')
      }
      const codeList = fakeCodeList[checkUser.userId]

      return resultSuccess(codeList)
    },
  },
  {
    url: '/basic-api/logout',
    timeout: 200,
    method: 'get',
    response: (request) => {
      const accessToken = getRequestToken(request)
      if (!accessToken) return resultError('Invalid accessToken.')
      const checkUser = createFakeUserList().find(
        (item) => item.accessToken === accessToken,
      )
      if (!checkUser) {
        return resultError('Invalid accessToken.')
      }
      return resultSuccess(undefined, { message: 'Token has been destroyed' })
    },
  },
  {
    url: '/basic-api/testRetry',
    statusCode: 505,
    method: 'get',
    response: () => {
      return resultError('Error!')
    },
  },
])
