import { MockMethod } from 'vite-plugin-mock'
import {
  resultError,
  resultSuccess,
  getRequestToken,
  requestParams,
} from '@vben/utils/mock-util'

export function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'vben',
      realname: 'Vben Admin',
      email: 'test@gmail.com',
      phone: '13800138000',
      address: 'Xiamen City 77',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
      desc: 'manager',
      password: '123456',
      accessToken: 'fakeToken1',
      roles: [
        {
          name: 'Super Admin',
          value: 'super',
        },
      ],
    },
    {
      userId: '2',
      username: 'test',
      password: '123456',
      realname: 'test user',
      email: 'test@gmail.com',
      phone: '13800138000',
      address: 'Xiamen City 77',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=339449197&s=640',
      desc: 'tester',
      accessToken: 'fakeToken2',
      roles: [
        {
          name: 'Tester',
          value: 'test',
        },
      ],
    },
  ]
}

const fakeCodeList: any = {
  '1': ['1000', '3000', '5000'],

  '2': ['2000', '4000', '6000'],
}
export default [
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

      if (!checkUser) {
        return resultError('Incorrect account or password！')
      }

      return resultSuccess(checkUser)
    },
  },
  {
    url: '/basic-api/getUserInfo',
    method: 'get',
    response: (request: requestParams) => {
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
    response: (request: requestParams) => {
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
    response: (request: requestParams) => {
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
] as MockMethod[]
